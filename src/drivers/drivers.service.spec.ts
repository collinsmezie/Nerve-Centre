import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { getModelToken } from '@nestjs/mongoose';

describe('DriversService', () => {
  let service: DriversService;

  const mockDriverModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    }),
  };

  const mockCompanyModel = {
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null), // You can adjust this later
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: getModelToken('Driver'),
          useValue: mockDriverModel,
        },
        {
          provide: getModelToken('Company'),
          useValue: mockCompanyModel,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array from findAll', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });
});
