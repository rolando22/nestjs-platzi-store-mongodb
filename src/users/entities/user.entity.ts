import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Customer } from './customer.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    delete returnedObject.password;
    return returnedObject;
  },
});

UserSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_, returnedObject) => {
    returnedObject._id = (returnedObject._id as Types.ObjectId).toString();
    delete returnedObject.password;
    return returnedObject;
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashPassword = await bcrypt.hash(this.password, 10);

  this.password = hashPassword;

  return next();
});
