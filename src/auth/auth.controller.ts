import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    const token = this.authService.generateToken({ userId: 1, username: body.username });
    return { accessToken: token };
  }

  @Get('profile')
  getProfile(@Headers('authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    const decoded = this.authService.verifyToken(token);
    return { user: decoded };
  }
}
