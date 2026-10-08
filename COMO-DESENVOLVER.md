# Como desenvolver o Toqqui (Signal)

Guia de desenvolvimento **em fases**, do estado atual do repositório até o MVP
descrito em `documentacao-proximidade.md` (Capítulos 4–7). Cada fase fecha um
conjunto de requisitos com teste — nada avança sem o critério de aceite da
fase anterior.

> A especificação manda. Em qualquer conflito entre este guia e
> `documentacao-proximidade.md`, vale a documentação (em especial a **matriz
> nível × interação**, seção 3.3).

---

## 0. Ponto de partida (estado real do repo)

| Parte | Estado hoje |
|---|---|
| `server/` | Scaffold do Nest CLI: módulos `auth`, `user`, `message` com services **stub** (`'This action adds a new auth'`), gateway vazio, sem banco, sem JWT, sem validação. Testes de exemplo com Vitest passam. |
| `client/` | Projeto Flutter padrão (contador de demo) — `lib/main.dart` só. Sem pacotes de geolocalização/mapa/WS. |
| Raiz | `documentacao-proximidade.md` (especificação), `referencias.md` (bibliografia + docs técnicos). |

Ou seja: **nenhuma funcionalidade existe ainda.** As fases abaixo começam do
zero funcional.

---

## 1. Ambiente e comandos

```bash
# Servidor (pnpm, ESM)
cd server
pnpm install
pnpm start:dev        # dev com watch (porta 3000)
pnpm lint             # oxlint --type-aware
pnpm test             # vitest (unit)
pnpm test:e2e         # vitest e2e (supertest)
pnpm test:cov         # cobertura
pnpm format           # prettier
pnpm build

# Cliente (Flutter)
cd client
flutter pub get
flutter run
flutter test
flutter build apk     # APK para a demonstração
```

**Convenções do repo (já estabelecidas pelo scaffold):**

- Servidor é **ESM** (`module: nodenext`) → imports relativos sempre com
  extensão `.js`: `import { X } from './x.js'`.
- Testes com **Vitest** (`*.spec.ts` ao lado do código); lint com **oxlint**.
- Nomes de teste em português declarando a **regra defendida** (ex.:
  `amizade_nao_cria_fora_do_raio`) — exigência do Cap. 6.1.

### Dependências a instalar (Fase 0)

```bash
cd server
pnpm add @nestjs/config @nestjs/typeorm typeorm better-sqlite3 \
  class-validator class-transformer @nestjs/jwt @nestjs/passport \
  @nestjs/websockets @nestjs/platform-socket.io @nestjs/schedule \
  @nestjs/throttler bcryptjs

cd client
flutter pub add geolocator flutter_map latlong2 socket_io_client \
  dio flutter_secure_storage permission_handler flutter_riverpod \
  go_router
```

> Verifique versões compatíveis com Nest 12 / Flutter 3.x (SDK `^3.13.3`)
> antes de fixar. Documentação de cada pacote em `referencias.md` (Parte B).

---

## 2. Estrutura de pastas proposta

Um módulo NestJS por domínio, espelhando as entidades do 5.2:

```
server/src/
  auth/        # registro, login, refresh, guards
  user/        # perfil, explore (ativo/raio), /me, graph_visible
  presence/    # registro em memória, TTL, diff de coins  (NÃO persiste)
  touch/       # toque, detecção de reciprocidade
  friendship/  # matcher de proximidade, arestas, comuns, remoção
  graph/       # consulta do grafo (+ metadados de interação)
  zone/        # zonas, presença em zona, raios por place_type
  event/       # eventos, join, expiração
  conversation/# conversas, mensagens, purga, sugestão de encontro
  moderation/  # bloqueio, denúncia, suspensão
  jobs/        # @nestjs/schedule: TTLs e purgas
  gateway/     # gateways Socket.IO (presence, chat)
  common/      # DTOs globais, interceptors, filtros, rate limits
```

Cliente com arquitetura por recurso:

```
client/lib/
  main.dart
  app/               # router, tema, providers
  core/              # http client, ws client, storage seguro, constantes
  features/
    auth/            # login, registro
    explore/         # toggle, raio, mapa com coins
    touch/           # pulse recebido, pulso do coin
    chat/            # conversas, mensagens
    friendship/      # amizade, grafo (visual)
    zone/            # mapa de zona, criar/entrar/sair, chat grupal
    event/           # criar/listar/entrar
    settings/        # privacidade, LGPD (exportar/excluir), simulação
```

---

## 3. Invariantes da matriz (nunca furar)

Toda fase que mexer em interação deve manter estas 4 regras, e **cada uma
precisa de teste nomeado** (Cap. 6):

1. **Amizade só no nível usuário** e exige toque mútuo **+** proximidade
   verificada (5–10 m nominal, tolerância GPS). Zona/evento geram chat, nunca
   aresta.
2. **Chat grupal só em zona/evento** (`is_group` nunca em `level='user'`).
3. **Sugestão de encontro só em chat nascido de zona**, < 150 m, no máx. 1× a
   cada 6 h — **nunca** em chat 1:1 de nível usuário.
4. **Posição nunca persiste**: só memória, TTL 60 s, descarte no off/disconnect
   (RF-T03). Não existe tabela de localização.

---

## 4. As fases

### Fase 0 — Fundação do servidor
**RFs:** infraestrutura (habilita todos os outros)

- TypeORM + SQLite (`better-sqlite3`) no `AppModule`, `synchronize: false`,
  **migrations** versionadas.
- Primeira migration com a entidade `user` do 5.2.1 (com `explore_radius_m`
  padrão 150, `friendship_radius_m` padrão 10, `graph_visible`).
- `ValidationPipe` global (`whitelist: true`, `transform: true`) + `.env`
  via `@nestjs/config`.
- Limpar os stubs de `auth`/`user`/`message` (vão ser reescritos nas fases 1 e 3)
  ou substituir por health check.
- CI local: `pnpm lint && pnpm test && pnpm build` verdes.

**Aceite:** `pnpm start:dev` sobe, migration aplica, `pnpm lint && pnpm test`
passam.

---

### Fase 1 — Autenticação e perfil (Passo a passo)
**RFs:** RF-U01, RF-U02 · RN05 (base)

#### Pré-requisitos
- Fase 0 concluída (TypeORM + SQLite + migrations + ValidationPipe + .env).
- Dependências já instaladas: `@nestjs/jwt`, `@nestjs/passport`, `bcryptjs`, `class-validator`, `class-transformer`, `@nestjs/config`.

#### Passo 1.1 — Definir entidade User
**O que fazer:**
- Criar/ajustar `server/src/user/entities/user.entity.ts` com os campos do modelo (Cap. 5.2.1): `id` (uuid), `email` único, `password_hash`, `name`, `avatar_url?`, `explore_radius_m` (default 150), `friendship_radius_m` (default 10), `graph_visible` (default true), `status`, `created_at`, `updated_at`.

**Por quê:** Autenticação depende de usuário persistido.

**Como validar:** Compilar TypeScript (`pnpm build`) sem erros. Ver migration futura incluir tabela `user`.

#### Passo 1.2 — Preparar ambiente e config JWT
**O que fazer:**
- Garantir `@nestjs/config` carregando `.env` (server). Adicionar variáveis: `JWT_SECRET`, `JWT_ACCESS_EXPIRES_IN` (ex.: `15m`), `JWT_REFRESH_EXPIRES_IN` (ex.: `7d`), `DATABASE_PATH`.
- Configurar `JwtModule` no `AuthModule` (registrar de forma síncrona com `useFactory` lendo `ConfigService`).

**Por quê:** Tokens separados (access curto + refresh). Seguir boas práticas.

**Como validar:** `pnpm build` OK. Sem valores hardcoded de segredo.

#### Passo 1.3 — DTOs e validação para Auth
**O que fazer:**
- Criar `auth/dto/register.dto.ts`: `email` (string, email), `password` (string, min 8), `name` (string, min 2, max 50). Transformar/validar com class-validator.
- Criar `auth/dto/login.dto.ts`: `email` (email), `password` (string).
- Criar `auth/dto/refresh.dto.ts`: `refreshToken` (string, não vazio).
- Criar tipos/retornos simples (tokens + user público).

**Por quê:** ValidationPipe global (`whitelist: true`, `transform: true`) — só passa campos esperados.

**Como validar:** DTOs com decorators corretos. Teste unitário pode mockar.

#### Passo 1.4 — Estratégias Passport (JWT) e Guards
**O que fazer:**
- Criar `auth/strategies/jwt.strategy.ts` (access token): extrai Bearer do header, valida com `JWT_SECRET`, retorna payload `{ sub, email }`.
- Criar `auth/strategies/jwt-refresh.strategy.ts` (refresh): lê `refreshToken` (body/cookie conforme necessário) com segredo/expiração próprios.
- Criar `auth/guards/jwt-auth.guard.ts` (herda `AuthGuard('jwt')`) e `jwt-refresh.guard.ts`.
- Criar `auth/decorators/current-user.decorator.ts` para injetar usuário autenticado.
- Configurar `PassportModule` no `AuthModule`.

**Por quê:** Guard JWT global com exceção para `/auth/*` (definido no Passo 1.6). Separar access/refresh.

**Como validar:** Guards compilam. Estratégias leem ConfigService.

#### Passo 1.5 — AuthService (lógica pura)
**O que fazer:**
- `register(registerDto)`: verificar se email existe → lançar `ConflictException` (409). Gerar `password_hash` com `bcryptjs` (salt rounds >= 10). Criar user via `UserRepository`/TypeORM. **Nunca** retornar `password_hash`. Gerar access + refresh (com payload `{ sub: user.id, email: user.email }`).
- `login(loginDto)`: buscar user por email. Comparar senha com `bcrypt.compare` → `UnauthorizedException` (401) se inválido. Gerar tokens. Retornar user público + tokens.
- `refresh({ refreshToken })`: validar refresh (strategy/verify). Se válido, rotacionar tokens (emitir novos access+refresh). Tratar token inválido → 401.
- `validateUser(email, password)`: helper interno (opcional).

**Regra:** Hash com bcryptjs/scrypt — nunca texto puro. Duplicidade → 409. Senha errada → 401.

**Como validar:** Testes unitários de `AuthService` (`*.spec.ts`) com repositório mockado.

#### Passo 1.6 — AuthController e Guards globais
**O que fazer:**
- Substituir stubs: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`.
- Proteger rotas com JWT: aplicar `JwtAuthGuard` global (`APP_GUARD`) no `AppModule`, com **exceção** para `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh` (pode usar `@Public()` decorator ou `Reflector`).
- Adicionar rotas protegidas de perfil: `GET /me` (usa `@CurrentUser()`), `PATCH /me/profile` (DTO próprio: `name?`, `avatar_url?`, `graph_visible?`).

**Por quê:** Isola endpoints públicos. `GET /me` e `PATCH /me/profile` exigem auth.

**Como validar:** Rotas `/auth/*` acessíveis sem token. `/me` retorna 401 sem Bearer, 200 com token válido.

#### Passo 1.7 — UserService/Profile
**O que fazer:**
- Em `UserService`: `findByEmail`, `findById`, `create`, `updateProfile(id, dto)` (validar campos, não permitir alterar `email/password` por este endpoint).
- DTO `UpdateProfileDto`: `name?` (2–50), `avatar_url?` (URL opcional), `graph_visible?` (boolean).

**Por quê:** Separação de responsabilidades (auth x user).

**Como validar:** `PATCH /me/profile` atualiza apenas campos permitidos.

#### Passo 1.8 — Testes (unit + e2e) e lint/build
**O que fazer:**
- **Unitários** (`auth.service.spec.ts`, `user.service.spec.ts`): cobrir casos felizes + 409 (email duplicado) + 401 (credenciais inválidas). Usar mocks do Repository/JWT.
- **E2E** (`*.e2e-spec.ts`): fluxo `register → /me → patch /me/profile → login inválido`. Supertest + banco em memória/SQLite temporário.
- Rodar: `pnpm lint`, `pnpm test`, `pnpm test:e2e`, `pnpm build`. Tudo verde.

**Como validar:** Cobertura mínima dos casos de aceite. Nomes de teste em **português** declarando regra (ex.: `registro_com_email_duplicado_retorna_409`).

#### Passo 1.9 — Cliente (mínimo necessário p/ validar)
**O que fazer (opcional mas recomendado nesta fase):**
- `client/lib/core/storage/secure_storage.dart` (flutter_secure_storage): salvar `accessToken`, `refreshToken`.
- `client/lib/core/http/dio_client.dart`: interceptor adiciona Bearer; em 401 tenta refresh e reenvia request (retry com token novo).
- Telas básicas `features/auth/login_screen.dart`, `register_screen.dart` (só p/ fluxo manual). `flutter test` com mocks.

**Como validar:** Login/registro funcionam contra API local. Renovação de token em 401.

**Critério de aceite (Cap. 6.2.1):** registro válido cria conta e emite tokens; e-mail duplicado → 409; login inválido → 401; `PATCH /me/profile` atualiza dados permitidos. `pnpm lint && pnpm test && pnpm test:e2e && pnpm build` verdes.

---

### Fase 2 — Presença, Explorar e mapa
**RFs:** RF-U03, RF-U04, RF-U05, RF-T03, RF-T04, RNF01, RNF02, RNF09

> É o coração do produto. Fazer devagar.

- `PresenceService` **em memória** (`Map<userId, {lat,lng,accuracy,updated_at}>`),
  sem repository — reforçar em code review que nada vaza para o banco.
- Gateway `presence/` (Socket.IO): `presence/position` (C→S), `presence/coins`
  (diff S→C), `presence/heartbeat` (renova TTL 60 s).
- Validação de pacote: limites lat/lng, casas decimais, `accuracy > 50 m` →
  descarta, velocidade implícita > 29 m/s → rejeita (5.5.2).
- Diff de coins por cliente: quem está dentro do `explore_radius_m` do
  destinatário (haversine/`@turf`) vira coin; saiu do raio → some.
- REST: `POST /me/explore/activate|deactivate`, `PATCH /me/explore/radius`
  (10 m–2 km).
- **Cliente:** toggle Explorar com diálogo de finalidade (prova de consentimento
  LGPD), `geolocator` com cadência 15 s em 1º plano / 60 s em 2º plano,
  `flutter_map` com OSM e os coins; histerese de 5 m na fronteira.
- Modo simulação desde já (tela de depuração que injeta coordenadas, com aviso
  visível — 7.2.2): é o que permite desenvolver sem sair de casa.

**Aceite (6.2.2):** coin aparece a 80 m e não a 150,3 m; desligar remove o
coin; heartbeat de 70 s expira o registro; `accuracy` de 60 m descarta o
pacote; nenhuma tabela de localização existe (verificar por inspection da
migration).

---

### Fase 3 — Toque mútuo e chat 1:1
**RFs:** RF-U06–RF-U08, RF-U11, RF-U12, RF-T01, RF-T02, RNF08

- Tabela `touch` (com `level` e `context_id`), `POST /touches`.
- Lógica de reciprocidade no servidor: toque recíproco **de mesmo nível e
  mesmo contexto** → cria/reaproveita conversa 1:1 (`level='user'` por ora);
  discordância de nível = não-mútuo (teste `toque_em_niveis_diferentes_nao_abre_chat`).
- Auto-toque → 400; rate limit (31/min, 3 ao mesmo destino em 30 s) → 429.
- Conversa 1:1: `POST/GET /conversations/:id/messages` com `seq`,
  entrega por `chat/message:new`; `DELETE /conversations/:id` marca
  `deleted_at` (purga 48 h vem no Fase 7).
- Gateway `presence/pulse_received` ao destinatário.
- **Cliente:** estado do coin com pulso ao tocar, caixa de pulses recebidos
  (`GET /touches/received`), tela de conversa 1:1 efêmera (sem sugestão de
  encontro — RF-U12).

**Aceite (6.2.3):** toque único não abre chat; recíproco abre; recíproco a 3 km
abre chat **sem** amizade (a amizade vem na Fase 4, mas o contrato já
responde `friendshipCreated: false`).

---

### Fase 4 — Amizade e grafo
**RFs:** RF-U09, RF-U10, RF-U15–RF-U18, RN04, RN06

- `FriendshipService.matcher()`: ao toque mútuo no nível usuário, lê as duas
  posições do `PresenceService` e só cria aresta se distância ≤
  `friendship_radius_m` + tolerância e `accuracy` ≤ 30 m. Grava `via` (hoje
  `gps`) e `verified_at`.
- Tabela `friendship` com `UNIQUE (user_a, user_b)` (normalizar o par:
  `user_a < user_b`).
- `GET /friendships`, `GET /friendships/common`, `DELETE /friendships/:id`,
  `GET /graph` (nó + arestas + contagem de toques, ocultando quem tem
  `graph_visible=false`).
- **Cliente:** visualização do grafo (nós/arestas — `graph`/`force` em canvas
  ou pacote equivalente), ações de remover aresta e ocultar, filtro de amigos
  em comum.

**Aceite (6.2.4):** mútuo a 8 m → aresta; mútuo a 3 km → nenhuma aresta
(`amizade_nao_cria_fora_do_raio`); insert duplicado bloqueado pelo UNIQUE;
`graph_visible=false` some para terceiros.

---

### Fase 5 — Zona (nível Ambiente)
**RFs:** RF-A01–RF-A09, RN03

- Tabelas `zone` e `zone_presence`; raio por `place_type` (tabela 5.4.2),
  configurável 10 m–2 km.
- `POST /zones` cria **ou** reentra em zona existente do mesmo
  tipo+local; `GET /zones/around`, `POST /zones/:id/join|leave`.
- Coins dentro da zona só para quem tem presença registrada nela
  (fronteira do raio).
- Chat grupal opcional (`POST /zones/:id/chat`, `is_group=true`,
  `level='zone'`), com `expires_at` = TTL 12 h renovado por presença
  (`@nestjs/schedule` job).
- Sugestão de encontro: no gateway de chat, ao receber posição de dois
  membros de uma conversa `level='zone'` a < 150 m, injeta mensagem de sistema
  com deduplicação de 6 h.
- **Cliente:** mapa da zona com coins, tela de criação (tipo → raio sugerido),
  entrada/saída, chat grupal opcional.

**Aceite (6.2.5 e 6.2.6):** tipo `square` → raio 100 m; `cafe` → 30 m; sair do
raio remove o coin; 12 h sem presença expira a zona e o chat; sugestão aparece
em chat de zona e **não** aparece em chat 1:1.

---

### Fase 6 — Evento (nível Evento)
**RFs:** RF-E01–RF-E06

- Tabela `event` (vinculada opcionalmente a `zone`), `POST /events`,
  `GET /events` (próximos por data), `POST /events/:id/join`, chat geral
  opcional (`level='event'`).
- Fim do evento (job) encerra o chat e agenda purga das mensagens em 24 h.
- Toque mútuo em contexto de evento segue as regras de zona (abre chat, não
  cria amizade) — reutilizar o matcher da Fase 3 com `context_id`.

**Aceite (6.4.3):** criar evento → entrar → chat geral → terminar → chat
encerrado e purgado.

---

### Fase 7 — Transversais: purga, LGPD, moderação, limites
**RFs:** RF-U13, RF-U14, RF-T03 (revisão), RNF08, RN05, RN02

- Jobs (`@nestjs/schedule`): purga 48 h pós-`deleted_at`, purga 24 h pós
  contexto, expiração de zonas/TTLs, expiração da presença (redundante ao TTL
  em memória, mas defensiva).
- `POST /blocks`, `POST /reports`; 3 bloqueios distintos → `is_suspended` e
  contas suspensas não criam vínculos.
- LGPD: `GET /me/data` (exportação JSON) e `DELETE /me` (exclusão com purga em
  até 48 h). Revisar texto de consentimento no toggle Explorar.
- Rate limiting global (`@nestjs/throttler`) e validação de payload (500 chars
  em mensagem).
- **Garantir RN02:** sem endpoint de feed, sem contadores públicos, sem
  gamificação. Se aparecer um "likes", é bug.

**Aceite (6.2.6 + 5.5):** mensagens > 500 chars → 400; 21/min → 429; exportação
contém só dados do titular; exclusão remove tudo em ≤ 48 h.

---

### Fase 8 — Testes de aceitação e demonstração
**RFs:** Cap. 6 inteiro

- Completar a matriz de testes de integração do 6.3 (permissão negada, GPS
  impreciso, fronteira em tempo real com histerese, concorrência de toques,
  desconexão abrupta).
- Roteiro ponta-a-ponta do 6.4 nos **dois aparelhos** (nível usuário, ambiente,
  evento) + teste 4 de falsificação (posições a 5 km não geram aresta).
- Modo simulação consolidado com indicador visível (7.2.2).
- Cobertura mínima: `pnpm test:cov` + `flutter test` verdes; registrar
  evidência (saída dos testes) para o Cap. 6 da monografia.

**Aceite:** os 4 cenários globais do 6.4 passam e são reproduzíveis.

---

### Fase 9 — Embalagem e implantação
**RFs:** Cap. 7

- `Dockerfile` + `docker compose` do servidor (com volume SQLite).
- `flutter build apk` (release) para a apresentação.
- README raiz com: o que é, como rodar, roteiro da demonstração, estrutura,
  e ponteiro para `documentacao-proximidade.md` e `referencias.md`.
- Tag git `mvp-0.1`.

**Aceite:** um colega clona o repo, sobe o servidor com um comando e roda o
app em emulador seguindo só o README.

---

## 5. Mapa requisito → fase

| Fase | Requisitos atendidos |
|---|---|
| 0 — Fundação | infraestrutura |
| 1 — Auth/perfil | RF-U01, RF-U02 |
| 2 — Presença/mapa | RF-U03, RF-U04, RF-U05, RF-T03, RF-T04, RNF01, RNF02, RNF09 |
| 3 — Toque/chat | RF-U06, RF-U07, RF-U08, RF-U11, RF-U12, RF-T01, RF-T02, RNF08 (parcial) |
| 4 — Amizade/grafo | RF-U09, RF-U10, RF-U15, RF-U16, RF-U17, RF-U18, RN04, RN06 |
| 5 — Zona | RF-A01 … RF-A09 |
| 6 — Evento | RF-E01 … RF-E06 |
| 7 — Transversais | RF-U13, RF-U14, RN05, RN02, RNF08, RF-A08/E05 (purgas) |
| 8 — Aceitação | Cap. 6 (estratégia, integração, critérios globais) |
| 9 — Implantação | Cap. 7 |

> Conferir contra a **matriz de rastreabilidade** (4.5) da documentação: se
> aparecer RF sem fase, o guia está incompleto.

---

## 6. Definição de pronto (checklist por fase)

- [ ] Endpoint(s) validados com DTO (`class-validator`), códigos de erro
      corretos (400/401/403/404/409/429).
- [ ] Teste unitário **nomeando a regra** cobrindo o caminho feliz e o
      proibido (ex.: `chat_grupal_nao_existe_no_nivel_usuario`).
- [ ] Nenhuma coordenada em tabela (RF-T03) — revisar a migration.
- [ ] Lint, testes e build verdes (`pnpm lint && pnpm test && pnpm build`).
- [ ] `flutter test` verde e app roda no emulador.
- [ ] RNF correspondente coberto (precisão, TTL, rate limit…).
- [ ] Commit com mensagem no padrão do repo (`feat: fase 3 — toque e chat`).

---

## 7. Armadilhas conhecidas (ler antes de codar)

1. **SQLite não tem tipos espaciais** — distância é sempre calculada em código
   (haversine/`@turf`); não tente `ST_Distance` antes da migração para
   PostGIS/PostGIS.
2. **Fronteira do raio oscila** (GPS jitter) → histerese de 5 m e
   `distanceFilter` no `geolocator`; sem isso, o coin pisca na borda.
3. **Reciprocidade concorrente** — dois toques simultâneos devem resultar em
   **uma** conversa e **uma** aresta (usar transação/uniq constraint, não
   `if` solto).
4. **Nível/Contexto do toque** — comparar `level + context_id` dos dois toques;
   comparar só o destinatário cria chat cruzado entre níveis.
5. **Segundo plano** — iOS/Android limitam GPS em background; não prometer
   15 s em background (RNF02 já trata disso).
6. **ESM no servidor** — esquecer o `.js` nos imports relativos quebra só em
   runtime/build, não no IDE.
7. **Tiles OSM** — não usar tiles públicos sem seguir a política de uso;
   atribuição obrigatória no mapa.
8. **Bateria** — geofencing grosso fora de zona; GPS fino só dentro (5.4.1).
   Implementar a escada, não GPS permanente.

---

## 8. Como verificar o todo

```bash
# Servidor
cd server && pnpm lint && pnpm test && pnpm test:e2e && pnpm build

# Cliente
cd client && flutter analyze && flutter test
```

Demonstração final: seguir o roteiro do **7.2.1** da documentação com dois
aparelhos (ou o modo simulação com o aviso visível).

**Material de apoio:** bibliografia e links de documentação em
`referencias.md`; especificação completa em `documentacao-proximidade.md`.
