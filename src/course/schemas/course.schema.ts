import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  Course_Name: string;

  @Prop({ required: true })
  Duration: string;

  @Prop({ required: true})
  Course_Details: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
