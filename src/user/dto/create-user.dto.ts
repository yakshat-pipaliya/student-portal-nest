import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @MinLength(2)
  Name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  Email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  Password: string;

  @ApiProperty({ example: 'Student', description: 'The role of the user', enum: ['Student', 'Teacher'] })
  @IsEnum(['Student', 'Teacher'])
  Role: string;
} 