import { IsString, IsEmail, IsEnum, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  Name?: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user', required: false })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  Password?: string;

  @ApiProperty({ example: 'Student', description: 'The role of the user', enum: ['Student', 'Teacher'], required: false })
  @IsOptional()
  @IsEnum(['Student', 'Teacher'])
  Role?: string;
} 