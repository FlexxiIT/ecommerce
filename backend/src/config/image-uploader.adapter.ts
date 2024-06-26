import { v2 as cloudinary } from 'cloudinary';
import { envs } from './envs';
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../domain';

cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});


export class ImageUploader {

  constructor() { }

  static async uploadFromBuffer(files: UploadedFile[]) {
    try {
      const uploadPromises = files.map(file => new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'products',
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        ).end(file.data);
      }));

      const uploadResults = await Promise.all(uploadPromises);

      return uploadResults;
    } catch (error) {
      throw CustomError.internalServer('Internal server error on iu');
    }
  }

}