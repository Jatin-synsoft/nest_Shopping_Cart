import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Order extends Document {

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  orderBy: string;
}


export const OrderSchema = SchemaFactory.createForClass(Order);

