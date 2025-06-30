import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GeoFenceGroupDocument = GeoFenceGroup & Document;

@Schema({ 
  timestamps: true,
  versionKey: false,
})
export class GeoFenceGroup {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Boolean, default: false })
  isSpecialGroup: boolean;

  @Prop({ type: Number, default: 0 })
  riskScore: number;

  @Prop({ type: [Types.ObjectId], ref: 'GeoFence' })
  geoFences: Types.ObjectId[];
}


export const GeoFenceGroupSchema = SchemaFactory.createForClass(GeoFenceGroup);

GeoFenceGroupSchema.virtual('geoFencesDetails', {
  ref: 'GeoFence',
  localField: 'geoFences',
  foreignField: '_id',
  justOne: false,
});