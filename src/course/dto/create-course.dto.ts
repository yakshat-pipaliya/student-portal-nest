import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Backend', description: 'The name of the course' })
  @IsString()
  @IsNotEmpty()
  Course_Name: string;

  @ApiProperty({ example: '12 month', description: 'Duration of the course' })
  @IsString()
  @IsNotEmpty()
  Duration: string;

  @ApiProperty({ example: 'Web development fundamentals and backend systems', description: 'Details of the course' })
  @IsString()
  @IsNotEmpty()
  Course_Details: string;
}
