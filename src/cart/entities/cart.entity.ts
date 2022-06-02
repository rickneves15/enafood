import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type CartDocument = Cart & Document;

export class ProductCart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ default: null })
  value: number;

  @Prop()
  quantity: number;
}

@Schema()
export class Cart {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Product', default: null })
  products: ProductCart[];

  @Prop({ default: null })
  address: string;

  @Prop({ default: 0 })
  amount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
