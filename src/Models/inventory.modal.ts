import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Inventory extends Document {
  @Prop({ required: true })
  quantity: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;


}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

