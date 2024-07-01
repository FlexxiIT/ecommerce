import { UploadedFile } from "express-fileupload";
import { CloudinaryUploadResult, ImageUploader } from "../../config";





export class ImageService {

    // DI
    constructor() { }


    async uploadImages(files: UploadedFile[]) {
        if (files && files.length > 0) {
            const uploadResults: CloudinaryUploadResult[] = await ImageUploader.uploadFromBuffer(files);
            return uploadResults;
        } else {
            return [];
        }
    }

    async deleteImages(public_id: string) {
        await ImageUploader.deleteImages(public_id);
    }

}