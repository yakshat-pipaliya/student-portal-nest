import { IsString, IsEmail, IsEnum, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, userRoles } from '../../common/messages';

export class UpdateUserDto {
  @ApiProperty({
    example: messages.nameRequired.example,
    description: messages.nameRequired.description,
    required: false
  })
  @IsOptional()
  @IsString({ message: messages.nameRequired.message })
  @MinLength(2, { message: messages.nameMinLength.message })
  Name?: string;

  @ApiProperty({
    example: messages.emailInvalid.example,
    description: messages.emailInvalid.description,
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: messages.emailInvalid.message })
  Email?: string;

  @ApiProperty({
    example: messages.passwordRequired.example,
    description: messages.passwordRequired.description,
    required: false
  })
  @IsOptional()
  @IsString({ message: messages.passwordRequired.message })
  @MinLength(6, { message: messages.passwordMinLength.message })
  Password?: string;

  @ApiProperty({
    example: messages.roleRequired.example,
    description: messages.roleRequired.description,
    enum: userRoles,
    required: false
  })
  @IsOptional()
  @IsEnum(userRoles, { message: messages.roleInvalid.message })
  Role?: string;
}