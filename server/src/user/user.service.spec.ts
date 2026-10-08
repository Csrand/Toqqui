import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service.js';
import { User } from './entities/user.entity.js';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve_retornar_usuario_pelo_email', async () => {
    const user = { id: '1', email: 'test@test.com' } as User;
    mockRepository.findOne.mockResolvedValue(user);

    const result = await service.findByEmail('test@test.com');
    expect(result).toEqual(user);
  });
});
