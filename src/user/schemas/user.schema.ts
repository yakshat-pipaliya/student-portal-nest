import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { messages, userRoles } from '../../common/messages';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: [true, messages.nameRequired.message] })
  Name: string;

  @Prop({ required: [true, messages.emailRequired.message], unique: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, messages.emailInvalid.message] })
  Email: string;

  @Prop({ required: [true, messages.passwordRequired.message] })
  Password: string;

  @Prop({ enum: { values: userRoles, message: messages.roleInvalid.message }, default: 'Student', required: [true, messages.roleRequired.message] })
  Role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);