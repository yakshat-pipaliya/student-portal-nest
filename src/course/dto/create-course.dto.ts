import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages } from '../../common/messages';

export class CreateCourseDto {
  @ApiProperty({
    example: messages.courseNameRequired.example,
    description: messages.courseNameRequired.description,
  })
  @IsString({ message: messages.courseNameRequired.message })
  @IsNotEmpty({ message: messages.courseNameRequired.message })
  Course_Name: string;

  @ApiProperty({
    example: messages.courseDurationRequired.example,
    description: messages.courseDurationRequired.description,
  })
  @IsString({ message: messages.courseDurationRequired.message })
  @IsNotEmpty({ message: messages.courseDurationRequired.message })
  Duration: string;

  @ApiProperty({
    example: messages.courseDetailsRequired.example,
    description: messages.courseDetailsRequired.description,
  })
  @IsString({ message: messages.courseDetailsRequired.message })
  @IsNotEmpty({ message: messages.courseDetailsRequired.message })
  Course_Details: string;
}
