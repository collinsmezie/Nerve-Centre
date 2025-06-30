// src/companies/schemas/asset.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { REGION_ENUM } from 'lib/constants';
import { Document, Types } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Asset {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ unique: true, required: true })
  assetId: string; // System generated

  @Prop({ unique: true, required: true })
  assetNumber: string; // System generated

  @Prop()
  vehicleCategory: string; // Drop down

  @Prop()
  subVehicleType: string; // Drop down

  @Prop({
    enum: [120, 100, 80],
  })
  vehicleMaxSpeed: number;

  @Prop({
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'natural-gas'],
  })
  @IsEnum(['petrol', 'diesel', 'electric', 'hybrid', 'natural-gas'])
  engineType: string;

  @Prop({ required: true })
  vehicleMake: string;

  @Prop({ required: true, text: true })
  vehicleModel: string;

  @Prop({ required: true })
  vehicleYear: number;

  @Prop()
  dateOfPurchase: Date; // Optional field

  @Prop({ text: true })
  vehicleRegisterNumber: string;

  @Prop({ required: true, text: true })
  licenseNumber: string;

  @Prop({ text: true })
  fleetNumber: string;

  @Prop({
    enum: ['low', 'medium', 'high'],
  })
  @IsEnum(['low', 'medium', 'high'])
  riskGroup: string;

  @Prop({
    enum: ['fleet', 'license-number', 'combination-of-both'],
  })
  showFleet: string;

  @Prop({ required: true, text: true })
  vin: string;

  @Prop({
    enum: [
      'self-propelled',
      'trailer',
      'semi-trailer',
      'trailer-drawn-by-tractor',
    ],
  })
  @IsEnum([
    'self-propelled',
    'trailer',
    'semi-trailer',
    'trailer-drawn-by-tractor',
  ])
  driven: string;

  @Prop({ text: true })
  engineNumber: string;

  @Prop({ text: true })
  vehicleDescription: string;

  @Prop()
  tare: number;

  @Prop()
  gvm: number;

  @Prop()
  nvc: number;

  @Prop({ text: true })
  regAuthority: string;

  @Prop({ text: true })
  controlNumber: string;

  @Prop()
  dateOfExpiry: Date;

  @Prop({
    type: {
      goods: { type: Boolean, default: false },
      passengers: { type: Boolean, default: false },
      dangerousGoods: { type: Boolean, default: false },
    },
    default: {
      goods: false,
      passengers: false,
      dangerousGoods: false,
    },
    _id: false,
  })
  prDpCategories: {
    goods: boolean;
    passengers: boolean;
    dangerousGoods: boolean;
  };

  @Prop({
    enum: ['blue', 'yellow', 'black', 'white', 'green', 'kelly', 'other'],
  })
  vehicleColour: string;

  @Prop({ text: true })
  specialMarkings: string;

  @Prop({
    enum: ['1st-group', '2nd-group', '3rd-group'],
  })
  subGroup1: string;

  @Prop({
    enum: REGION_ENUM,
  })
  region: string;

  @Prop({
    enum: ['1st-group', '2nd-group', '3rd-group'],
  })
  subGroup2: string;

  @Prop({
    type: {
      exists: { type: Boolean, required: true },
      provider: { type: String },
      deviceId: { type: String },
    },
    required: true,
    _id: false,
  })
  cameraDevice: {
    exists: boolean;
    provider?: string;
    deviceId?: string;
  };

  @Prop({
    type: {
      exists: { type: Boolean, required: true },
      provider: { type: String },
      deviceId: { type: String },
    },
    required: true,
    _id: false,
  })
  telematicsDevice: {
    exists: boolean;
    provider?: string;
    deviceId?: string;
  };

  @Prop({
    type: {
      exists: { type: Boolean, required: true },
      deviceId: { type: String },
      caseNumber: { type: String },
    },
    required: true,
    _id: false,
  })
  svrDevice: {
    exists: boolean;
    deviceId?: string;
    caseNumber?: string;
  };

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

// Add virtual field for company
AssetSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
});
