import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  private allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  private maxFileSize = 5 * 1024 * 1024; 

  transform(file: any): any {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileExt = extname(file.originalname).toLowerCase();
    if (!this.allowedImageTypes.includes(fileExt)) {
      throw new BadRequestException('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException('File size exceeds the maximum limit (1MB).');
    }
    return file;
  }

}

// import { Injectable, NestMiddleware, BadRequestException, Req } from '@nestjs/common';
// import { extname } from 'path';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class ImageValidatorMiddleware implements NestMiddleware {
//   private allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
//   private maxFileSize = 5 * 1024 * 1024;

//   use(@Req() req: Request, res: Response, next: NextFunction): void {

//     const file = req.file;

//     if (!file) {
//       throw new BadRequestException('No file uploaded');
//     }

//     const fileExt = extname(file.originalname).toLowerCase();

//     if (!this.allowedImageTypes.includes(fileExt)) {
//       throw new BadRequestException('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.');
//     }

//     if (file.size > this.maxFileSize) {
//       throw new BadRequestException('File size exceeds the maximum limit (5MB).');
//     }
//     next();
//   }
// }
