import { Test, TestingModule } from '@nestjs/testing';
import { GeoFenceGroupController } from './geo-fence-group.controller';
import { GeoFenceGroupService } from './geo-fence-group.service';

describe('GeoFenceGroupController', () => {
  let controller: GeoFenceGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoFenceGroupController],
      providers: [GeoFenceGroupService],
    }).compile();

    controller = module.get<GeoFenceGroupController>(GeoFenceGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
