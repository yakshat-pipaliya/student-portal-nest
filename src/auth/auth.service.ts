import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'YP'; 

  generateToken(payload: any): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
