import { ImageUploader } from "../../config";





export class ImageService {

    // DI
    constructor() { }


    async uploadImage(file: any) {
        const uploadResults = await ImageUploader.uploadFromBuffer(file);
    }

}