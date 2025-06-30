// src/companies/dto/create-asset.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsMongoId,
  IsObject,
  IsDateString,
} from 'class-validator';
import { REGION_ENUM } from 'lib/constants';

export class CreateAssetDto {
  @ApiProperty({
    description: 'ID of the company that owns the asset',
    example: '6630952e0b67cdabed72b23c',
  })
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsMongoId()
  companyId: string; // Reference to the owning Company _id

  @ApiProperty()
  @IsNotEmpty({ message: 'Vehicle category cannot be empty' })
  @IsString()
  vehicleCategory: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Sub-vehicle type cannot be empty' })
  @IsString()
  subVehicleType: string;

  @ApiProperty({ enum: [120, 100, 80] })
  @IsNotEmpty({ message: 'Vehicle max speed cannot be empty' })
  @IsEnum([120, 100, 80])
  vehicleMaxSpeed: number;

  @ApiProperty({
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'natural-gas'],
  })
  @IsNotEmpty({ message: 'Engine type cannot be empty' })
  @IsEnum(['petrol', 'diesel', 'electric', 'hybrid', 'natural-gas'])
  engineType: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vehicle make cannot be empty' })
  @IsString()
  vehicleMake: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vehicle model cannot be empty' })
  @IsString()
  vehicleModel: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vehicle year cannot be empty' })
  @IsInt()
  vehicleYear: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfPurchase?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehicleRegisterNumber?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'License number cannot be empty' })
  @IsString()
  licenseNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fleetNumber?: string;

  @ApiProperty({ enum: ['fleet', 'license-number', 'combination-of-both'] })
  @IsNotEmpty({ message: 'Show fleet cannot be empty' })
  @IsEnum(['fleet', 'license-number', 'combination-of-both'])
  showFleet: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'VIN cannot be empty' })
  @IsString()
  vin: string;

  @ApiProperty({
    enum: [
      'self-propelled',
      'trailer',
      'semi-trailer',
      'trailer-drawn-by-tractor',
    ],
  })
  @IsNotEmpty({ message: 'Driven field cannot be empty' })
  @IsEnum([
    'self-propelled',
    'trailer',
    'semi-trailer',
    'trailer-drawn-by-tractor',
  ])
  driven: string;

  @ApiProperty({ enum: ['low', 'medium', 'high'] })
  @IsNotEmpty({ message: 'Risk group cannot be empty' })
  @IsEnum(['low', 'medium', 'high'])
  riskGroup: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  engineNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehicleDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tare?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  gvm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  nvc?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regAuthority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  controlNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfExpiry?: Date;

  @ApiProperty({
    type: 'object',
    properties: {
      goods: { type: 'boolean', default: false },
      passengers: { type: 'boolean', default: false },
      dangerousGoods: { type: 'boolean', default: false },
    },
    default: {
      goods: false,
      passengers: false,
      dangerousGoods: false,
    },
  })
  @IsNotEmpty({ message: 'PrDP Category cannot be empty' })
  @IsObject()
  prDpCategories: {
    goods: boolean;
    passengers: boolean;
    dangerousGoods: boolean;
  };

  @ApiProperty({
    enum: ['blue', 'yellow', 'black', 'white', 'green', 'kelly', 'other'],
  })
  @IsNotEmpty({ message: 'Vehicle colour cannot be empty' })
  @IsEnum(['blue', 'yellow', 'black', 'white', 'green', 'kelly', 'other'])
  vehicleColour: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialMarkings?: string;

  @ApiProperty({ enum: ['1st-group', '2nd-group', '3rd-group'] })
  @IsNotEmpty({ message: 'Company sub-group 1 cannot be empty' })
  @IsEnum(['1st-group', '2nd-group', '3rd-group'])
  subGroup1: string;

  @ApiProperty({ enum: ['1st-group', '2nd-group', '3rd-group'] })
  @IsNotEmpty({ message: 'Company sub-group 2 cannot be empty' })
  @IsEnum(['1st-group', '2nd-group', '3rd-group'])
  subGroup2: string;

  @ApiProperty({
    enum: REGION_ENUM,
  })
  @IsNotEmpty({ message: 'Region cannot be empty' })
  @IsEnum(REGION_ENUM)
  region: string;

  @ApiProperty({
    type: 'object',
    properties: {
      exists: { type: 'boolean', required: true },
      provider: { type: 'string', enum: ['pf', 'icar'] },
      deviceId: { type: 'string' },
    },
  })
  @IsNotEmpty({ message: 'Camera device information cannot be empty' })
  @IsObject()
  cameraDevice: {
    exists: boolean;
    provider?: 'pf' | 'icar';
    deviceId?: string;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      exists: { type: 'boolean', required: true },
      provider: { type: 'string', enum: ['pf', 'teltonika'] },
      deviceId: { type: 'string' },
    },
  })
  @IsNotEmpty({ message: 'Telematics device information cannot be empty' })
  @IsObject()
  telematicsDevice: {
    exists: boolean;
    provider?: 'pf' | 'teltonika';
    deviceId?: string;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      exists: { type: 'boolean', required: true },
      deviceId: { type: 'string' },
      caseNumber: { type: 'string' },
    },
  })
  @IsNotEmpty({ message: 'SVR device information cannot be empty' })
  @IsObject()
  svrDevice: {
    exists: boolean;
    deviceId?: string;
    caseNumber?: string;
  };
}
