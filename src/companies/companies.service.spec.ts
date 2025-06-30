import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getModelToken('Company'),
          useValue: {
            // mock model methods
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            // add more as needed
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
