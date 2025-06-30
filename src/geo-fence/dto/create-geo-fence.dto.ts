// create-geofence.dto.ts
import { IsEnum, IsOptional, IsString, IsNotEmpty, IsMongoId, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { GeoFenceType, HourEnum, ShapeType } from '../../../lib/constants';
import { ShapeDto } from './geo-fence-shapes.dto';
import { Type } from 'class-transformer';
import { CircleShapeDto } from './geo-fence-shapes.dto';
import { PolygonShapeDto } from './geo-fence-shapes.dto';

export class CreateGeoFenceDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'description must be a string' })
  description: string;

  @IsOptional()
  @IsMongoId()
  groupId?: string;

  @IsEnum(GeoFenceType, {
    message: `type must be one of the following values: regular, special`,
  })
  type: GeoFenceType;

  @IsOptional()
  @IsEnum(HourEnum, {
    message: 'hour must be one of the following values: 3, 6, 9, 12, 24',
  })
  hour?: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Geo-fence must have at least 1 fence' })
  @ValidateNested({ each: true })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: ShapeType.CIRCLE, value: CircleShapeDto },
        { name: ShapeType.POLYGON, value: PolygonShapeDto },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  geoFenceShapes: ShapeDto[];
}
