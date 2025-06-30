import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';

@Schema()
export class OrderItem {
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  product: Product | Types.ObjectId;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
