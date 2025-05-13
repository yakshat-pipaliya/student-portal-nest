import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { messages } from '../../common/messages';

export class LoginUserDto {
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
}