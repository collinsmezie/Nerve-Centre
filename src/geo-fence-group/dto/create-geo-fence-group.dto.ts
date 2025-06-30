// create-geofence-group.dto.ts
import { IsEnum, IsOptional, IsString, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateGeoFenceGroupDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isSpecialGroup: boolean;

  @IsNumber()
  @Min(0)
  @Max(100)
  riskScore: number;
}
