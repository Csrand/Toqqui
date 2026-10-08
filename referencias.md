# REFERÊNCIAS — Toqqui (Signal)

Material de apoio dividido em duas partes:

- **Parte A — Bibliografia acadêmica:** fontes para os capítulos da monografia
  (`documentacao-proximidade.md`), organizadas por seção, com indicação do que
  cada fonte sustenta.
- **Parte B — Referências técnicas:** documentação oficial, pacotes e normas
  usados no desenvolvimento (cliente Flutter e servidor NestJS).

As referências já listadas na seção `REFERÊNCIAS` de
`documentacao-proximidade.md` continuam válidas; este arquivo as **expande**.
Formatação acadêmica em estilo ABNT (NBR 6023) para conferência da banca.

---

# PARTE A — BIBLIOGRAFIA ACADÊMICA

## A.1 — Capítulos 1 e 2.1: redes sociais, atenção e dark patterns

Sustentam: a definição de rede social, o modelo de atenção (feed, métricas,
gamificação) e a crítica a ele.

**BOYD, danah M.; ELLISON, Nicole B.** Social Network Sites: Definition,
History, and Scholarship. *Journal of Computer-Mediated Communication*, v. 13,
n. 1, p. 210–230, 2007.
DOI: https://doi.org/10.1111/j.1083-6101.2007.00393.x

> Revisão canônica que define *social network sites* e faz a história (inclui o
> SixDegrees, citado na seção 1.1). Base para ancorar a crítica em vez de
> deixá-la abstrata.

**SIMON, Herbert A.** Designing Organizations for an Information-Rich World.
In: GREENBERGER, M. (Ed.). *Computers, Communications, and the Public Interest*.
Baltimore: Johns Hopkins Press, 1971. p. 37–72.

> Origem conceitual da "economia da atenção" ("a riqueza da informação cria uma
> pobreza de atenção"). Sustenta 1.1 e 2.1.

**WU, Tim.** *The Attention Merchants: The Epic Scramble to Get Inside Our
Heads*. Nova York: Alfred A. Knopf, 2016. *(já citada)*

**ZUBOFF, Shoshana.** *The Age of Surveillance Capitalism: The Fight for a
Human Future at the New Frontier of Power*. Nova York: PublicAffairs, 2019.
*(já citada)*

**BRIGNULL, Harry.** *Dark Patterns.* 2010. Disponível em:
https://www.darkpatterns.org. *(já citada)*

> Cunhagem do termo; útil para a taxonomia de mecanismos (2.1).

**GRAY, C. M.; KOU, Y.; BATTLES, B.; HOGGATT, J.; TOOMBS, A. L.** The Dark
(Patterns) Side of UX Design. In: *Proceedings of the 2018 CHI Conference on
Human Factors in Computing Systems*. ACM, 2018. p. 1–14.
DOI: https://doi.org/10.1145/3173574.3174209 *(já citada)*

**MATHUR, Arunesh et al.** Dark Patterns at Scale: Findings from a Crawl of 11K
Shopping Websites. *Proceedings of the ACM on Human-Computer Interaction*, v. 3,
n. CSCW, art. 81, 2019.
DOI: https://doi.org/10.1145/3359183

> Evidência empíica de prevalência (1.818 instâncias, 15 tipos em 7 categorias).
> Bom para transformar a crítica do 2.1 em dado verificável e para escolher
> quais mecanismos o produto **não** implementa (RN02).

**FEDERAL TRADE COMMISSION (FTC).** *Bringing Dark Patterns to Light*: Staff
Report. Washington, DC, set. 2022.
Disponível em: https://www.ftc.gov/reports/bringing-dark-patterns-light

> Relatório regulatório com classificação de práticas e recomendações; dá
> autoridade institucional à seção 2.1.

**OECD.** *Dark Commercial Patterns*. OECD Digital Economy Papers, n. 336.
Paris: OECD Publishing, 26 out. 2022.
DOI: https://doi.org/10.1787/a3b37b40-en

> Define "dark commercial patterns" operacionalmente e revisa evidências de
> prejuízo ao consumidor. Base normativa para falar de consentimento e escolha
> livre (também útil no 4.1 e 5.5).

**UNIÃO EUROPEIA.** Regulamento (UE) 2022/2065 (Digital Services Act),
art. 25 — proibição de interfaces enganosas. 19 out. 2022.
Disponível em: https://eur-lex.europa.eu/eli/reg/2022/2065/oj

> Exemplo de proibição legal de *dark patterns*; sustenta a justificativa
> regulatória (1.5) de que a crítica já virou política pública.

### Leitura complementar (indústria, não citar como evidência acadêmica)

**EYAL, Nir.** *Hooked: How to Build Habit-Forming Products*. Sound Ideas, 2014.
> Contraponto: o "modo de fazer" das redes atuais que o produto rejeita.

**CARR, Nicholas.** *The Shallows: What the Internet Is Doing to Our Brains*.
Nova York: W. W. Norton, 2010.

---

## A.2 — Capítulo 2.2: proximidade física e encontro

Sustentam: por que o encontro presencial importa e o papel do lugar.

**HALL, Edward T.** *The Hidden Dimension*. Nova York: Doubleday, 1966.
*(já citada)*

> Proxemics: distâncias íntima/pessoal/social/pública. Base para dimensionar
> os raios (5–10 m amizade; raios de zona).

**GOFFMAN, Erving.** *The Presentation of Self in Everyday Life*. Nova York:
Doubleday, 1959.

> Presença, encenação e "face" no encontro presencial — sustenta que o vínculo
> em contexto físico tem natureza diferente do nick.

**OLDENBURG, Ray.** *The Great Good Place*. Nova York: Paragon House, 1989.

> Conceito de *third place* (praça, bar, café) — direto para justificar zona
> como "lugar vira contexto" (3.2/3.4).

**PUTNAM, Robert D.** *Bowling Alone: The Collapse and Revival of American
Community*. Nova York: Simon & Schuster, 2000.

> Declínio do capital social e do contato cara a cara; base empírica para a
> contextualização (1.1) e justificativa (1.5).

**WHYTE, William H.** *The Social Life of Small Urban Spaces*. Nova York:
Project for Public Spaces, 1980.

> Observação direta de como as pessoas ocupam praças e ruas; apoio empírico ao
> papel do lugar como contexto social (2.2) e ao roteiro de demonstração (7.2).

**KLIENBERG, Eric.** *Palaces for the People: How Social Infrastructure Can Help
Fight Inequality, Polarization, and the Decline of Civic Life*. Nova York:
Crown, 2018.

> Infraestrutura social (bibliotecas, praças, quadras) como condição de
> encontro — sustenta a hipótese (1.3) em termos sociológicos.

**DUNBAR, Robin I. M.** The Social Brain Hypothesis. *Evolutionary
Anthropology*, v. 6, n. 5, p. 178–190, 1996.
DOI: https://doi.org/10.1002/(SICI)1520-6505(1996)6:5%3C178::AID-EVAN5%3E3.0.CO;2-8

> Limite cognitivo de grupos (~150). Útil para discutir escala do grafo, cold
> start e por que o produto não otimiza para alcance (3.7, 8.3).

---

## A.3 — Capítulo 2.3: tecnologias de proximidade

Sustentam: precisão de GPS, custo de bateria e a decisão "5–10 m com BLE/NFC
ideal, GPS como fallback".

**NATIONAL GEOSPATIAL-AGENCY (GPS.GOV).** *GPS Accuracy*.
Disponível em: https://www.gps.gov/systems/gps/performance/accuracy/

> Números oficiais de precisão (horizontal típico; melhor com SBAS). Fonte da
> afirmação "GPS ±5–20 m" e do corte de `accuracy` no 5.4.1.

**ETZLINGER, Bernhard; NUßBAUMMÜLLER, Barbara; PETERSEIL, Philipp; HUMMEL,
Karin Anna.** Distance Estimation for BLE-based Contact Tracing — A Measurement
Study. 2021. arXiv:2101.09075.
DOI: https://doi.org/10.48550/arXiv.2101.09075

> Medição real: RSSI de BLE com RMSE ~3 m; detecção de contato abaixo de 2,5 m
> com TPR ~0,65. Sustenta que BLE serve para *proximidade*, não para medida
> exata — e por que `friendship.via` é extensível (5.4.1).

**BLUETOOTH SIG.** *Bluetooth Channel Sounding*. 2024.
Disponível em:
https://www.bluetooth.com/learn-about-bluetooth/feature-enhancements/channel-sounding/

> Recurso do Bluetooth Core 6.0 com precisão de dezenas de centímetros (PBR +
> RTT). Base do "trabalho futuro BLE/NFC" (8.3): mostra que a verificação exata
> de amizade é viável no ecossistema.

**APPLE.** *Getting Started with iBeacon*. Cupertino, 2014.
Disponível em: https://developer.apple.com/ibeacon/

> Referência de ranging por beacon: estados de proximidade
> (immediate/near/far/unknown) e limites de RSSI. Útil para fundamentar por que
> o MVP usa GPS com tolerância e o BLE entra depois.

**FETTE, I.; MELNIKOV, A.** RFC 6455 — The WebSocket Protocol. IETF, 2011.
*(já citada)*

> Base do transporte de tempo real (RF-T01/T02).

### Notas de apoio (não contam como fonte primária)

- **Fórmula de Haversine** — implementação de referência:
  https://www.movable-type.co.uk/scripts/latlong.html (Veness, *Calculate the
  distance between two latitude/longitude points*). O servidor pode usar a
  mesma fórmula ou `@turf/turf` (`distance`), que a embute.
- **Google.** *Eddystone* (beacon BLE) — projeto arquivado; citar apenas como
  histórico do lado Android do iBeacon.

---

## A.4 — Capítulo 2.4: aplicações correlatas

Sustentam: o que já existe (geo-social, *dating*, chats de bairro) e onde cada
um fica aquém do eixo "conexão exige presença".

**CRANSHAW, Justin; TOCH, Eran; HONG, Jason; KITTUR, Aniket; SADEH, Norman.**
Bridging the Gap Between Physical Location and Online Social Networks. In:
*Proceedings of the 12th ACM International Conference on Ubiquitous Computing
(UbiComp '10)*. 2010. p. 119–128.

> Localização como preditor de amizade (489 usuários). Mostra que proximidade
> *sugere* vínculo — o produto faz o inverso: exige proximidade para *criar*
> vínculo. Contraste direto para 2.4.

**LINDQVIST, Ju; CRANSHAW, Justin; WIESE, Jason; HONG, Jason; ZIMMERMAN, John.**
I'm the Mayor of My House: Examining Why People Use Foursquare. In: *Proceedings
of the SIGCHI Conference on Human Factors in Computing Systems (CHI '11)*. ACM,
2011. p. 2409–2412. DOI: https://doi.org/10.1145/1978942.1979295

> Motivações reais de uso do Foursquare (incluindo privacidade). Base para
> descrever o correlato geo-social e o *check-in* como anti-padrão do produto
> (o Signal não pede check-in; a presença é automática e transitória).

**CRANSHAW, Justin; SCHWARTZ, Raz; HONG, Jason I.; SADEH, Norman.** The
Livehoods Project: Utilizing Social Media to Understand the Dynamics of a City.
In: *Proceedings of the International AAAI Conference on Web and Social Media
(ICWSM)*, v. 6, n. 1, p. 58–65, 2012.
DOI: https://doi.org/10.1609/icwsm.v6i1.14278

> O lugar como unidade social dinâmica — apoio conceitual ao nível
> Ambiente/Zona (3.2).

**SCELLATO, S.; NTOULAS, A.; MASCOLO, C.** Socio-Spatial Properties of Online
Location-Based Social Networks. In: *Proceedings of the 5th International AAAI
Conference on Weblogs and Social Media (ICWSM)*. 2011. *(já citada)*

**TIMMERMANS, Elisabeth; DE CALUWÉ, Elien.** Development and Validation of the
Tinder Motives Scale (TMS). *Computers in Human Behavior*, v. 70, p. 341–350,
2017. DOI: https://doi.org/10.1016/j.chb.2017.01.028

> 13 motivos de uso do Tinder com base em 3.262 participantes. Sustenta a
> diferenciação "não é dating" (3.1) com evidência, não com adjetivo.

**GORDON, Eric; DE SOUZA E SILVA, Adriana.** *Net Locality: Why Location
Matters in a Networked World*. Malden: Wiley-Blackwell, 2011.

> Enquadramento teórico de localidade em rede; apoio para discutir lugar como
> contexto (2.2/2.4).

### Correlatos descritos apenas por produto (sem obrigação de fonte acadêmica)

Nextdoor, Facebook "Amigos Próximos", Snapchat Snap Map, Happn, Zenly (encerrado
em 2022). Descreva cada um pelo que faz e pela diferença verificável para o
produto — a régua do trabalho exige diferença *mecânica*, não valorativa.

---

## A.5 — Capítulos 1.6/4.1: metodologia, elicitação e requisitos

**ISO/IEC/IEEE 29148:2018.** *Systems and software engineering — Life cycle
processs — Requirements engineering*. Geneva: ISO, 2018.

> Processo de elicitação/análise/especificação de requisitos e características
> de um bom requisito (verificável, único, rastreável) — formaliza 4.1 e a
> matriz de rastreabilidade 4.5.

**WIEGERS, Karl; BEATTY, Joy.** *Software Requirements*. 3. ed. Redmond:
Microsoft Press, 2013.

> Prática de elicitação, priorização (o rótulo E/I/D do 4.2) e catálogo de
> requisitos não-funcionais (4.4).

**HEVNER, Alan R. et al.** Design Science in Information Systems Research.
*MIS Quarterly*, v. 28, n. 1, p. 75–105, 2004.
DOI: https://doi.org/10.2307/25148625

> Ciclo de pesquisa por design (relevância → rigor → design → avaliação).
> Enquadra a construção do protótipo como método (1.7) e o Capítulo 6 como
> avaliação.

**SOMMERVILLE, Ian.** *Software Engineering*. 10. ed. Boston: Pearson, 2016.

> Apoio geral para arquitetura (5.1), testes (6.1) e processo (7.1).

---

## A.6 — Capítulos 4.1 e 5.5: LGPD e privacidade

**BRASIL.** Lei nº 13.709, de 14 de agosto de 2018 — Lei Geral de Proteção de
Dados Pessoais (LGPD). Disponível em:
https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
*(já citada)*

> Artigos usados diretamente no 5.5.1: 6º (princípios), 7º (base legal), 18
> (direitos do titular), 46 (segurança).

**BRASIL.** Lei nº 12.965, de 23 de abril de 2014 — Marco Civil da Internet.
Disponível em:
https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm

> Guarda de registros de conexão/acesso e privacidade — pertinente quando o
> servidor passar a ser exposto em produção (5.5, 7.4).

**AUTORIDADE NACIONAL DE PROTEÇÃO DE DADOS (ANPD).** *Guia orientativo —
Legítimo interesse*. Brasília: ANPD, 2022. Disponível em:
https://www.gov.br/anpd/pt-br

> Interpretacão oficial dos princípios; use junto ao texto do 5.5.1 para
> mostrar conformidade com o regulador, não apenas com a lei.

> **Observação prática:** a ativação do Explorar é consentimento por finalidade
> (Art. 7º, I). Registre na própria UI o texto da finalidade — ele é evidência
> de consentimento, não enfeite de tela.

---

## A.7 — Capítulos 3 e 5: design e usabilidade

**NORMAN, Donald A.** *The Design of Everyday Things*. Rev. ed. Nova York:
Basic Books, 2013.

> Affordances, feedback e visibilidade de estado — usar para justificar o gesto
> de toque mútuo e o estado do toggle Explorar (3.4, 6.x).

**ISO 9241-210:2019.** *Ergonomics of human-system interaction — Part 210:
Human-centred design for interactive systems*. Geneva: ISO, 2019.

> Processo de design centrado no usuário; apoio ao 1.7 se a metodologia
> incluir validação com usuários (8.3, item 2).

---

# PARTE B — REFERÊNCIAS TÉCNICAS (DESENVOLVIMENTO)

Cada item diz **para quê** serve neste projeto.

## B.1 — Cliente Flutter / Dart

| Referência | Para quê |
|---|---|
| Flutter Docs — https://docs.flutter.dev | Framework, widgets, navegação, estado |
| Dart — https://dart.dev | Linguagem, streams, async/await |
| geolocator — https://pub.dev/packages/geolocator | GPS, `accuracy`, `distanceFilter`, permissão em Android/iOS (RF-U03, RNF02) |
| flutter_map — https://pub.dev/packages/flutter_map | Mapa interativo com tiles OSM (RF-U04, RF-A04) |
| socket_io_client — https://pub.dev/packages/socket_io_client | WebSocket C↔S: presença, pulses, chat (RF-T01/T02) |
| dio — https://pub.dev/packages/dio | HTTP/REST com interceptores (token, retry, 401→refresh) |
| flutter_secure_storage — https://pub.dev/packages/flutter_secure_storage | Tokens fora do SharedPreferences |
| permission_handler — https://pub.dev/packages/permission_handler | Fluxo de permissão de localização com finalidade na UI (LGPD) |
| Riverpod — https://riverpod.dev **ou** flutter_bloc (BLoC) — https://bloc.dev | Estado global (Explore ligado/desligado, coins, conversas) |
| flutter_test / integration_test — https://docs.flutter.dev/testing | Testes de widget e E2E do cliente |

> Atenção ao pacote **flutter_map_tile_caching** ou URLs de tile: siga a
> política de uso do OpenStreetMap (B.6) — não hardcode tiles pesados.

## B.2 — Permissões e localização nas plataformas

| Referência | Para quê |
|---|---|
| Android — Location permissions: https://developer.android.com/develop/sensors-and-location/location/permissions | `ACCESS_FINE_LOCATION`, fluxo de runtime |
| Android — Background location: https://developer.android.com/develop/sensors-and-location/location/background | 2ª permissão; só se o GPS em 2º plano for necessário (RNF02) |
| iOS — Requesting authorization: https://developer.apple.com/documentation/corelocation/requesting-authorisation-to-use-location-services | `NSLocationWhenInUseUsageDescription` no Info.plist |
| iOS — Info.plist Location keys: https://developer.apple.com/documentation/bundleresources/information_property_list/nslocationwheninuseusagedescription | Texto de finalidade obrigatório (é prova de consentimento) |
| iOS — iBeacon/ranging: https://developer.apple.com/ibeacon/ | Base para a evolução BLE (8.3) |
| Android emulator — `geo fix <lng> <lat>` (console do emulador) | Injetar posição sem aparelho |
| Xcode — simulação de localização (Debug ▸ Simulate Location / GPX): https://developer.apple.com/documentation/xcode/simulating-location-in-tests | Testar rotas no simulador iOS |

## B.3 — Servidor NestJS

| Referência | Para quê |
|---|---|
| Docs NestJS — https://docs.nestjs.com | Módulos, providers, DI |
| Validation — https://docs.nestjs.com/techniques/validation | `class-validator` + `ValidationPipe` global (RF-T08) |
| Auth/JWT — https://docs.nestjs.com/security/jwt | `@nestjs/jwt`, guards, refresh (RF-U01) |
| Rate limiting — https://docs.nestjs.com/security/rate-limiting | `@nestjs/throttler` (RNF08: 429) |
| WebSockets/Gateways — https://docs.nestjs.com/websockets/gateways | Gateway Socket.IO (RF-T01/T02) |
| Schedule (cron/TTL) — https://docs.nestjs.com/modules/schedule | Purgas e expirações (RF-U11, RF-A08, RF-E05) |
| Configuration — https://docs.nestjs.com/techniques/configuration | `.env`, sem segredo em código |
| @nestjs/schematics (`nest g`) | Gerar módulos/controladores/serviços no padrão do repo |

> Convenção do repo: **ESM com `module: nodenext`** — imports relativos sempre
> com extensão `.js` (`import { X } from './x.js'`), como já faz o scaffold.

## B.4 — Tempo real (Socket.IO / WebSocket)

| Referência | Para quê |
|---|---|
| Socket.IO v4 — https://socket.io/docs/v4/ | Namespaces, rooms, ack, reconnect |
| Socket.IO + Redis adapter — https://socket.io/docs/v4/redis-adapter/ | Escala horizontal da presença/chat (7.4) |
| RFC 6455 — https://datatracker.ietf.org/doc/html/rfc6455 | Protocolo subjacente |

## B.5 — Persistência

| Referência | Para quê |
|---|---|
| TypeORM — https://typeorm.io | Entidades, repositórios, relações (5.2) |
| TypeORM Migrations — https://typeorm.io/migrations | Migrações versionadas (SQLite agora, Postgres depois) |
| TypeORM + SQLite — https://typeorm.io/installation | Driver `better-sqlite3` do protótipo |
| PostGIS — https://postgis.net | Evolução: consultas espaciais por raio (7.4) |

## B.6 — Geometria e mapa

| Referência | Para quê |
|---|---|
| turf (distance) — https://turfjs.org/docs/api/distance | Distância entre pontos (matcher de proximidade) |
| Haversine — https://www.movable-type.co.uk/scripts/latlong.html | Fórmula de referência (5.4.1) |
| OpenStreetMap Tile Usage Policy — https://operations.osmfoundation.org/policies/tiles/ | Política de uso de tiles (atribuição e volume) |
| Nominatim (geocoding) — https://nominatim.org/release-docs/latest/api/Search/ | Opcional: nomear lugares ao criar zona |

## B.7 — Qualidade, teste e lint (comandos do repo)

| Referência | Para quê |
|---|---|
| Vitest — https://vitest.dev | `pnpm test`, `pnpm test:cov` |
| Supertest — https://github.com/ladjs/supertest | Testes de endpoint no e2e (`pnpm test:e2e`) |
| oxlint — https://oxc.rs/docs/guide/usage/lint.html | `pnpm lint` |
| Prettier — https://prettier.io | `pnpm format` |
| Flutter testing — https://docs.flutter.dev/testing | `flutter test` |

## B.8 — Segurança

| Referência | Para quê |
|---|---|
| OWASP API Security Top 10 (2023) — https://owasp.org/API-Security/ | Checklist mínimo da API (auth, rate limit, payloads) |
| node:crypto (scrypt) ou bcrypt/argon2 | Hash de senha (`user.password_hash`) |
| RFC 6749 (OAuth 2.0) / RFC 9068 (JWT profile) | Formato do token de acesso |

## B.9 — Legal/LGPD no código

| Referência | Para quê |
|---|---|
| LGPD — https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm | Artigos do 5.5.1 |
| ANPD — https://www.gov.br/anpd/pt-br | Guias orientativos oficiais |

> Implementação direta: `GET /me/data` (exportação) e `DELETE /me` (exclusão,
> purga em 48 h) — 5.5.3.

## B.10 — Entrega

| Referência | Para quê |
|---|---|
| Docker — https://docs.docker.com/ | `docker compose up` do servidor (7.1) |
| Flutter build APK — https://docs.flutter.dev/deployment/android | `flutter build apk` para a demonstração |
| Git — https://git-scm.com/doc | Versionamento; commits por fase |

---

## Sugestão de leitura por ordem (para quem está começando)

1. `documentacao-proximidade.md` (Cap. 3, 4 e 5) — a especificação manda.
2. A.1 (Gray et al. + Mathur et al. + OECD) — entender a crítica em 1 página.
3. A.2 (Hall, Oldenburg) — entender os raios e o nível Zona.
4. B.3 (NestJS validation + gateways) e B.1 (geolocator + flutter_map) —
   o que será digitado primeiro.
5. B.4 (Socket.IO) e B.6 (haversine) — o coração da proximidade.
6. A.6 (LGPD + ANPD) — antes de persistir qualquer coisa de localização (que,
   regra do produto, **não** deve ser persistida: RF-T03).
