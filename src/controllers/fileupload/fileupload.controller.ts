import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { multerConfig } from 'src/helper/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileuploadController {

    @Post('file')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    uploadedFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new Error('No file provided');
            }
            const response = {
                message: "File Uploaded Succesfully ",
                originalname: file.originalname,
                filename: file.filename,
                filesize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            };
            return response;
        } catch (error) {
            console.error('Error uploading file:', error.message);
            throw new Error('Failed to upload file');
        }
    }

}


