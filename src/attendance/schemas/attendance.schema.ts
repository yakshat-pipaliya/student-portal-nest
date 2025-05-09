import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' ,required: true })
  UserId: MongooseSchema.Types.ObjectId; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course' , required: true })
  CourseId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true,})
  Date: Date;

  @Prop({ enum: ['Present', 'Absent'], required: true,})
  Status: string;
}

export const AttendancesSchema = SchemaFactory.createForClass(Attendance);