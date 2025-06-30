// src/drivers/dto/create-driver.dto.ts
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LICENSE_CODE_ENUM, REGION_ENUM } from 'lib/constants';

export class CreateDriverDto {
  @ApiProperty({
    description: 'ID of the company the driver works for',
    example: '6630952e0b67cdabed72b23c',
  })
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsMongoId()
  companyId: string; // Reference to the owning Company _id

  @ApiPropertyOptional({
    enum: ['male', 'female', 'other'],
    description: 'Gender of the driver',
  })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  faceID?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiPropertyOptional({ description: 'Email address of the driver' })
  @IsOptional()
  // @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  idNumber?: string;

  @ApiProperty({ description: "Driver's license number" })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({
    enum: LICENSE_CODE_ENUM,
    description: 'License code',
  })
  @IsEnum(LICENSE_CODE_ENUM)
  licenseCode?: string;

  @ApiPropertyOptional({
    enum: [0, 1, 2, 3, 4, 5, 7],
    description: 'Vehicle restrictions',
  })
  @IsOptional()
  @IsEnum([0, 1, 2, 3, 4, 5, 7])
  vehicleRestrictions?: number;

  @ApiPropertyOptional({
    enum: [0, 1, 2],
    description: 'Driver restrictions',
  })
  @IsOptional()
  @IsEnum([0, 1, 2])
  driverRestrictions?: number;

  @ApiPropertyOptional({
    enum: ['za', 'custom'],
    description: 'Issuing authority',
  })
  @IsOptional()
  @IsEnum(['za', 'custom'])
  issuingAuthority?: string;

  @ApiPropertyOptional({ description: 'Expiry date of the permit' })
  @IsOptional()
  @IsDateString()
  prDpExpiryDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    enum: REGION_ENUM,
  })
  @IsOptional()
  @IsEnum(REGION_ENUM)
  region?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  licenseValidFrom?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  licenseValidTo?: Date;

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

  @ApiProperty()
  @IsString()
  licenseFrontUrl: string;

  @ApiProperty()
  @IsString()
  licenseBackUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  copyFrontDriversLicence?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  copyRearDriversLicence?: string;
}
