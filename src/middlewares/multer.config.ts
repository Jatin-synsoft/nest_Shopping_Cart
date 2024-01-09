import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
const maxFileSize = 5 * 1024 * 1024;

const fileSizeFilter = (req: any, file: any, callback: any) => {
console.log(file)
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
  }
  if (file.size > maxFileSize) {
    console.log('File received:', file.size);
    return callback(new BadRequestException('File size exceeds the maximum limit (5MB).'), false);
  }

  callback(null, true);
};

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      if(+(req.rawHeaders[15])>=5242880 ){
        return callback(new BadRequestException('File size must be less than or equal to 5 MB'), '');
      }
      const originalname = file.originalname.replace(/\s/g, '_');
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
};
