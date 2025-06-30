import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'typeorm';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], required: true }) // Ensure role is an array of strings
  roles: string[];

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
