import { Test, TestingModule } from '@nestjs/testing';
import { GeoFenceGroupService } from './geo-fence-group.service';

describe('GeoFenceGroupService', () => {
  let service: GeoFenceGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoFenceGroupService],
    }).compile();

    service = module.get<GeoFenceGroupService>(GeoFenceGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
