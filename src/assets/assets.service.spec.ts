import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Asset } from './schemas/asset.schema';

describe('AssetsService', () => {
  let service: AssetsService;

  const mockAssetModel = {};
  const mockCompanyModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: 'AssetModel',
          useValue: mockAssetModel,
        },
        {
          provide: 'CompanyModel',
          useValue: mockCompanyModel,
        },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
