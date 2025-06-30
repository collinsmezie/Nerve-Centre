
import { Prop, Schema } from '@nestjs/mongoose';
import { ShapeType } from 'lib/constants';

@Schema({ _id: false })
class Coordinates {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;
}

@Schema({ _id: false })
class CircleShape {
  @Prop({ required: true })
  id: string;

  @Prop({ enum: ShapeType, default: ShapeType.CIRCLE })
  type: ShapeType.CIRCLE;

  @Prop({ type: Coordinates, required: true })
  center: Coordinates;

  @Prop({ required: true })
  radius: number;
}

@Schema({ _id: false })
class PolygonShape {
  @Prop({ required: true })
  id: string;

  @Prop({ enum: ShapeType, default: ShapeType.POLYGON })
  type: ShapeType.POLYGON;

  @Prop({ type: [Coordinates], required: true })
  paths: Coordinates[];
}

 export type GeoFenceShape = CircleShape | PolygonShape;