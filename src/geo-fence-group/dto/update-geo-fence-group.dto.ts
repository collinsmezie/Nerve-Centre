import { PartialType } from '@nestjs/swagger';
import { CreateGeoFenceGroupDto } from './create-geo-fence-group.dto';

export class UpdateGeoFenceGroupDto extends PartialType(CreateGeoFenceGroupDto) {}
