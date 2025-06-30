import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  IsIn,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsMongoId,
} from 'class-validator';

// Define regions enum for reuse
export enum Region {
  EASTERN_CAPE = 'eastern-cape',
  FREE_STATE = 'free-state',
  GAUTENG = 'gauteng',
  KWAZULU_NATAL = 'kwazulu-natal',
  LIMPOPO = 'limpopo',
  MPUMALANGA = 'mpumalanga',
  NORTH_WEST = 'north-west',
  NORTHERN_CAPE = 'northern-cape',
  WESTERN_CAPE = 'western-cape',
  CUSTOM = 'custom',
}

export class CreateICEContactDto {
  @ApiProperty({
    description: 'The ID of the company this ICE contact belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsMongoId({ message: 'Invalid company ID format' })
  companyId: string;

  @ApiProperty({
    description: 'The email address of the ICE contact (optional)',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiProperty({
    description: 'The name of the ICE contact',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone number of the ICE contact',
    example: '+27123456789',
  })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The priority level of the ICE contact (1, 2, or 3)',
    example: 1,
    enum: [1, 2, 3],
  })
  @IsNotEmpty({ message: 'Priority cannot be empty' })
  @IsInt({ message: 'Priority must be an integer' })
  @IsIn([1, 2, 3], { message: 'Priority must be 1, 2, or 3' })
  priority: number;

  @ApiProperty({
    description: 'The regions where this ICE contact is active',
    example: ['gauteng', 'western-cape'],
    enum: Object.values(Region),
    isArray: true,
  })
  @IsNotEmpty({ message: 'Regions cannot be empty' })
  @IsArray({ message: 'Regions must be an array' })
  @ArrayMinSize(1, { message: 'At least one region must be specified' })
  @IsEnum(Region, { each: true, message: 'Each region must be valid' })
  regions: string[];
}
