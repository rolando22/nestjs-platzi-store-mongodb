import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    return returnedObject;
  },
});

CategorySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    return returnedObject;
  },
});
