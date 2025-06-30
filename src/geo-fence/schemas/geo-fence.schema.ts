import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GeoFenceType, HourEnum } from 'lib/constants';
import { GeoFenceShape } from './geo-fence-shapes.schema';

export type GeoFenceDocument = GeoFence & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class GeoFence {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: GeoFenceType, default: GeoFenceType.REGULAR })
  type: GeoFenceType;

  // Reference to the GeoFenceGroup
  @Prop({ type:  Types.ObjectId, ref: 'GeoFenceGroup', required: false })
  groupId?:  Types.ObjectId;

  // Only valid for special fences, enum of allowed hour values
  @Prop({ enum: HourEnum, required: false })
  hour?: HourEnum;

  // NOTE: Future query optimization options will involve optimizing this field
  // to be a 2dsphere index for geo-indexed queries( GeoJSON format )
  @Prop({ type: [Object], required: true })
  geoFenceShapes: GeoFenceShape[];
}

export const GeoFenceSchema = SchemaFactory.createForClass(GeoFence);

// Add virtual field for group
GeoFenceSchema.virtual('group', {
  ref: 'GeoFenceGroup',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});