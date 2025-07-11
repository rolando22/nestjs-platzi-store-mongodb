import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [OrderItem] })
  items: Types.Array<OrderItem>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
