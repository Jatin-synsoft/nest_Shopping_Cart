import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const fileSizeFilter = (req: any, file: any, callback: any) => {

  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
  }
  const maxSize = 5242880;
  // the fact that the fileFilter function is called before Multer has fully processed the file and populated its properties.
  const size = +req.headers['content-length'];
  if (size > maxSize) {

    return callback(new BadRequestException(`File size exceeds the maximum limit (5MB).your file size ${(size/(1024*1024)).toFixed(2)} MB`), false);
  }

  callback(null, true);
};

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const originalname = file.originalname.replace(/\s/g, '_')
      const userProvidedName = req.body.filename || originalname;
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}-${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}-${currentDate.getSeconds().toString().padStart(2, '0')}`;

      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      const finalFilename = `image_${formattedDate}_${formattedTime}_${randomName}${extname(originalname)}`;
      callback(null, finalFilename);
    },
  }),
  fileFilter: fileSizeFilter
};
