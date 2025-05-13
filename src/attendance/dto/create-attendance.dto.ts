import { IsNotEmpty, IsEnum, IsMongoId, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class CreateAttendanceDto {
  @ApiProperty({
    example: '64c9e1342bdfa2f1e1234567',
    description: 'ID of the user attending the course',
  })
  @IsMongoId()
  @IsNotEmpty()
  UserId: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '64c9e1342bdfa2f1e7654321',
    description: 'ID of the course being attended',
  })
  @IsMongoId()
  @IsNotEmpty()
  CourseId: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '2025-05-13',
    description: 'Date of attendance',
  })
  @IsDateString()
  @IsNotEmpty()
  Date: Date;

  @ApiProperty({
    example: 'Present',
    description: 'Attendance status (Present or Absent)',
    enum: ['Present', 'Absent'],
  })
  @IsEnum(['Present', 'Absent'])
  @IsNotEmpty()
  Status: 'Present' | 'Absent';
}
