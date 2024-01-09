import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateDataMiddleware implements NestMiddleware {
  private readonly emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  private readonly numberRegex = /^\d{10}$/;
  private readonly passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  use(req: Request, res: Response, next: NextFunction) {

    const {name,email,password,phone } = req.body;

    if (email && !this.emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (phone && !this.numberRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid number format' });
    }

  
    if (password && !this.passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Invalid password format. It must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long.',
      });
    }

    next();
  }
}
