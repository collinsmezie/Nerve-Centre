import { PartialType } from '@nestjs/swagger';
import { CreateGeoFenceDto } from './create-geo-fence.dto';

export class UpdateGeoFenceDto extends PartialType(CreateGeoFenceDto) {}
