import { Test, TestingModule } from '@nestjs/testing';
import { GeoFenceService } from './geo-fence.service';

describe('GeoFenceService', () => {
  let service: GeoFenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoFenceService],
    }).compile();

    service = module.get<GeoFenceService>(GeoFenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
