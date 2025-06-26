import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OrderItem extends Document {
  @Prop({ type: Number })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
