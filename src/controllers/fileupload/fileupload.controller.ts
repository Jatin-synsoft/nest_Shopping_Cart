import { Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { multerConfig } from 'src/middlewares/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidator } from 'src/middlewares/image.decorator';
import { ImageValidatorPipe } from 'src/middlewares/imageValidator.middleware';
// import { ImageValidatorPipe } from 'src/middlewares/imageValidator.middleware';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
@Controller()
export class FileuploadController {

    @Post('file')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    // @UsePipes(ImageValidatorPipe)
    async uploadedFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new Error('No file provided');
            }

            const response = {
                originalname: file.originalname,
                filename: file.filename,
                filesize: file.size
            };

            return response;
        } catch (error) {
            // Handle the error appropriately, you might want to log it or return an error response
            console.error('Error uploading file:', error.message);
            throw new Error('Failed to upload file');
        }
    }

}


