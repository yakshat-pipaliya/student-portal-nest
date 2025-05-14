import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type InstituteDocument = Institute & Document;

@Schema()
export class Institute {
    @Prop({required: true})
    instituteName: string;

    @Prop({required: true, type: [String]})
    instituteImages: string[];

    @Prop({required: true})
    instituteDescription: string;
}

export const InstituteSchema = SchemaFactory.createForClass(Institute);