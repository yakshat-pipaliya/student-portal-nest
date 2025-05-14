import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { messages } from '../common/messages';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto.Email, signInDto.Password);
    if (!user) {
      throw new UnauthorizedException(messages.loginFailed.message);
    }
    return user;
  }
}
