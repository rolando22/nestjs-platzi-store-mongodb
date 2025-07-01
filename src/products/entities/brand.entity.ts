import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Brand extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    return returnedObject;
  },
});

BrandSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    return returnedObject;
  },
});
