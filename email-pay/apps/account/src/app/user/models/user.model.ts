import { Document } from 'mongoose';
import { IUser, UserRoleEnum } from '@email-pay/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRoleEnum,
    type: String,
    default: UserRoleEnum.CUSTOMER,
  })
  role: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
