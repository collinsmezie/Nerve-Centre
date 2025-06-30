import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { REGION_ENUM } from 'lib/constants';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ICEContactDocument = ICEContact & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ICEContact extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: [1, 2, 3] })
  priority: number;

  @Prop({
    type: [String],
    required: true,
    enum: REGION_ENUM,
  })
  regions: string[];

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const ICEContactSchema = SchemaFactory.createForClass(ICEContact);

// Add virtual field for company
ICEContactSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
});
