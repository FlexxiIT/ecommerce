import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export class ImageUploader {

    constructor() { }

    static async uploadFromBuffer(file: any) {
        console.log(file);
        const result = await cloudinary.uploader.upload_stream();
    }

}