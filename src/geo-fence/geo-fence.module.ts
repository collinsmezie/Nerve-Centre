import { Module } from '@nestjs/common';
import { GeoFenceService } from './geo-fence.service';
import { GeoFenceController } from './geo-fence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoFence, GeoFenceSchema } from './schemas/geo-fence.schema';
import { GeoFenceGroupModule } from '../geo-fence-group/geo-fence-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GeoFence.name, schema: GeoFenceSchema }]),
    GeoFenceGroupModule

  ],
  controllers: [GeoFenceController],
  providers: [GeoFenceService],
})
export class GeoFenceModule {}
