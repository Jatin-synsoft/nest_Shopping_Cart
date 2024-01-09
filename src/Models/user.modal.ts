import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: number;

  @Prop({
    type: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    required: true,
  })
  address: {
    city: string;
    state: string;
  };

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  roleId: string[];

  @Prop()
  stripeCustomerId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
