import { Module } from '@nestjs/common';
import { GeoFenceGroupService } from './geo-fence-group.service';
import { GeoFenceGroupController } from './geo-fence-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoFenceGroup, GeoFenceGroupSchema } from './schemas/geo-fence-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GeoFenceGroup.name, schema: GeoFenceGroupSchema }]),
  ],
  controllers: [GeoFenceGroupController],
  providers: [GeoFenceGroupService],
  exports: [MongooseModule],

})
export class GeoFenceGroupModule { }
