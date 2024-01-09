import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly secretKey = 'secerate-key';

  generateToken(dataToSign: Record<string, any>): string {
    return jwt.sign(dataToSign, this.secretKey);
  }

  verifyToken(token: string): jwt.JwtPayload {
    try {
      const decodedToken = jwt.verify(token, this.secretKey);
      return decodedToken as jwt.JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
