import { Document } from 'mongoose';
import { IUser, UserEnumRoleEnum } from '@email-pay/interfaces';
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
    enum: UserEnumRoleEnum,
    type: String,
    default: UserEnumRoleEnum.CUSTOMER,
  })
  role: UserEnumRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
