import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ example: 'Backend', description: 'The name of the course', required: false })
  @IsOptional()
  @IsString()
  Course_Name?: string;

  @ApiProperty({ example: '12 month', description: 'Duration of the course', required: false })
  @IsOptional()
  @IsString()
  Duration?: string;

  @ApiProperty({ example: 'Web development fundamentals and backend systems', description: 'Details of the course', required: false })
  @IsOptional()
  @IsString()
  Course_Details?: string;
}
