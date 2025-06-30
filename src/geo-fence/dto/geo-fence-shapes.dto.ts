import { IsString, ArrayMinSize, IsNumber, ValidateNested, IsArray, IsNotEmpty } from "class-validator";
import { Expose, Type } from "class-transformer";
import { ShapeType } from "lib/constants";

// Coordinate dto
export class CoordinateDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

// circle-shape dto
export class CircleShapeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: ShapeType.CIRCLE;

  @IsNotEmpty()
  @IsNumber()
  radius: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoordinateDto)
  center: CoordinateDto;
}

// polygon-shape dto
export class PolygonShapeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: ShapeType.POLYGON;

  @IsArray()
  @ArrayMinSize(3,  { message: 'Polygon must have at least 3 path coordinates' })
  @ValidateNested({ each: true })
  @Type(() => CoordinateDto)
  paths: CoordinateDto[];
}

export type ShapeDto = CircleShapeDto | PolygonShapeDto;