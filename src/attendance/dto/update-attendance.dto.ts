import { IsNotEmpty, IsEnum, IsMongoId, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class UpdateAttendanceDto {
  @ApiProperty({
    example: '64c9e1342bdfa2f1e1234567',
    description: 'ID of the user attending the course',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  UserId?: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '64c9e1342bdfa2f1e7654321',
    description: 'ID of the course being attended',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  CourseId?: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    example: '2025-05-13',
    description: 'Date of attendance',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  Date?: Date;

  @ApiProperty({
    example: 'Present',
    description: 'Attendance status (Present or Absent)',
    enum: ['Present', 'Absent'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['Present', 'Absent'])
  Status?: 'Present' | 'Absent';
}
