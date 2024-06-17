import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { CategoryEntity } from "./category.entity";




export class ProductEntity {

    constructor(
        public id: string,
        public categoryId: string,
        public subCategoryId: string,
        public name: string,
        public description: string,
        public price: number,
        public lowStockLimit: number,
        public available?: boolean,
        public stock?: number,
        public discount?: number,
        public image?: string,
        public timesSold?: number,
        public category?: CategoryEntity,
    ) { }

    static fromObject(object: { [key: string]: any }): ProductEntity {
        const { id, categoryId, subCategoryId, available, name, description, price, stock, discount, image, lowStockLimit, timesSold, category } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Product Id is not a valid Id');
        if (!categoryId) throw CustomError.badRequest('Missing category id');
        if (!isUUID(categoryId)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!subCategoryId) throw CustomError.badRequest('Missing sub category id');
        if (!isUUID(subCategoryId)) throw CustomError.badRequest('Sub category Id is not a valid Id');
        if (!name) throw CustomError.badRequest('Missing name');
        if (!description) throw CustomError.badRequest('Missing description');
        if (!price) throw CustomError.badRequest('Missing price');
        if (typeof lowStockLimit === 'undefined') throw CustomError.badRequest('Missing low stock limit');

        return new ProductEntity(
            id,
            categoryId,
            subCategoryId,
            name,
            description,
            price,
            lowStockLimit,
            available,
            stock,
            discount,
            image,
            timesSold,
            CategoryEntity.fromObject(category),
        );
    }
}