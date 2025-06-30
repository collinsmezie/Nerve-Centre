// src/companies/schemas/company.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REGION_ENUM } from 'lib/constants';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Company {
  @Prop({ unique: true, required: true })
  companyIdNo: string; // System generated

  @Prop({ required: true })
  companyName: string;

  @Prop({ unique: true, required: true })
  companyAbbreviation: string;

  @Prop({ required: true })
  legalPerson: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  businessLicenseNumber: string;

  @Prop({ nullable: true })
  vatNumber?: string;

  @Prop({ required: true })
  registeredCapital: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  accountDepartmentPerson: string;

  @Prop({ required: true })
  accountDepartmentName: string;

  @Prop({ required: true })
  accountDepartmentEmail: string;

  @Prop({
    type: [String],
    required: true,
    enum: REGION_ENUM,
  })
  regions: string[];

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
