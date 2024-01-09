
import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const ImageValidator = createParamDecorator(
  (data: unknown, file: Express.Multer.File) => {
 
    console.log(file)
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const maxFileSize = 5 * 1024 * 1024;

    const fileExt = extname(file.originalname).toLowerCase();

    if (!allowedImageTypes.includes(fileExt)) {
      throw new BadRequestException('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.');
    }

    if (file.size > maxFileSize) {
      throw new BadRequestException('File size exceeds the maximum limit (5MB).');
    }

    return file;
  },
);
