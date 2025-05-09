import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    UserId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    BOD: Date;

    @Prop({ required: true })
    Address: string;

    @Prop({ required: true })
    PhoneNo: Number;

    @Prop({ required: true })
    profileImage: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);