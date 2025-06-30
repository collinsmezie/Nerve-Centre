import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ActionStatus, EventGroupType } from 'lib/constants';

export type EventDocument = Event & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Event {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Driver', required: true })
  driverId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Asset', required: true })
  assetId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  dateTime: Date;

  @Prop({ required: true, enum: EventGroupType })
  eventGroupType: EventGroupType;

  @Prop()
  eventDetails?: string;

  @Prop({ required: true, enum: ActionStatus })
  action: ActionStatus;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Add virtual field for company
EventSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
});

// Add virtual field for driver
EventSchema.virtual('driver', {
  ref: 'Driver',
  localField: 'driverId',
  foreignField: '_id',
  justOne: true,
});

// Add virtual field for asset
EventSchema.virtual('asset', {
  ref: 'Asset',
  localField: 'assetId',
  foreignField: '_id',
  justOne: true,
});
