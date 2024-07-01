import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { ProductEntity } from "./product.entity";


export class ProductImageEntity {

    constructor(
        public id: string,
        public url: string,
        public size: string,
        public isPrimary?: boolean,
        public product?: ProductEntity,
    ) { }

    static fromObject(object: { [key: string]: any }): ProductImageEntity {
        const { id, url, isPrimary, size, product } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!url) throw CustomError.badRequest('Missing url');
        if (!url) throw CustomError.badRequest('Missing size');

        const productEntity = product ? ProductEntity.fromObject(product) : undefined;

        return new ProductImageEntity(id, url, isPrimary, size, productEntity);
    }
}
