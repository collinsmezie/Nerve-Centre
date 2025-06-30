// src/companies/dto/create-company.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
} from 'class-validator';
import { REGION_ENUM } from 'lib/constants';

export class CreateCompanyDto {
  @ApiPropertyOptional({ description: 'System-generated ID' })
  @IsOptional()
  @IsString()
  companyIdNo?: string;

  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Company abbreviation (system-generated)' })
  @IsString()
  @IsOptional()
  companyAbbreviation?: string;

  @ApiProperty({ description: 'Legal representative of the company' })
  @IsString()
  @IsNotEmpty()
  legalPerson: string;

  @ApiProperty({ description: 'Phone number of the company' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Email address of the company' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Industry of the company' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ description: 'Business license number' })
  @IsString()
  @IsNotEmpty()
  businessLicenseNumber: string;

  @ApiPropertyOptional({ description: 'VAT number (optional)' })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty({ description: 'Registered capital amount' })
  @IsString()
  @IsNotEmpty()
  registeredCapital: string;

  @ApiProperty({ description: 'Address of the company' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Name of the accounting department contact person',
  })
  @IsString()
  @IsNotEmpty()
  accountDepartmentPerson: string;

  @ApiProperty({ description: 'Name of the accounting department' })
  @IsString()
  @IsNotEmpty()
  accountDepartmentName: string;

  @ApiProperty({ description: 'Email of the accounting department' })
  @IsEmail()
  @IsNotEmpty()
  accountDepartmentEmail: string;

  @ApiProperty({
    description: 'Regions of the company branches',
    isArray: true,
    enum: REGION_ENUM,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsIn(REGION_ENUM, { each: true })
  regions: string[];
}
