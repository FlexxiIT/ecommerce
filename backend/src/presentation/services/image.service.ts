import { UploadedFile } from "express-fileupload";
import { ImageUploader } from "../../config";





export class ImageService {

    // DI
    constructor() { }


    async uploadImage(files: UploadedFile[]) {
        if(files) {
            const uploadResults = await ImageUploader.uploadFromBuffer(files);

            console.log(uploadResults);
        }
    }

}