import { Test, TestingModule } from '@nestjs/testing';
import { GeoFenceController } from './geo-fence.controller';
import { GeoFenceService } from './geo-fence.service';

describe('GeoFenceController', () => {
  let controller: GeoFenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoFenceController],
      providers: [GeoFenceService],
    }).compile();

    controller = module.get<GeoFenceController>(GeoFenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
