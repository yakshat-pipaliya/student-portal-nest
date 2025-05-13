import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages, userRoles } from '../../common/messages';

export class CreateUserDto {
  @ApiProperty({
    example: messages.nameRequired.example,
    description: messages.nameRequired.description
  })
  @IsString({ message: messages.nameRequired.message })
  @MinLength(2, { message: messages.nameMinLength.message })
  Name: string;

  @ApiProperty({
    example: messages.emailInvalid.example,
    description: messages.emailInvalid.description
  })
  @IsEmail({}, { message: messages.emailInvalid.message })
  Email: string;

  @ApiProperty({
    example: messages.passwordRequired.example,
    description: messages.passwordRequired.description
  })
  @IsString({ message: messages.passwordRequired.message })
  @MinLength(6, { message: messages.passwordMinLength.message })
  Password: string;

  @ApiProperty({
    example: messages.roleRequired.example,
    description: messages.roleRequired.description,
    enum: userRoles
  })
  @IsEnum(userRoles, { message: messages.roleInvalid.message })
  Role: string;
}