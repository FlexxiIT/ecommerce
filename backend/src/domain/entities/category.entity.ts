import { SubCategoryEntity } from "..";
import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { ProductEntity } from "./product.entity";




export class CategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public subCategories: SubCategoryEntity[],
        public products: ProductEntity[],
    ) { }

    static fromObject(object: { [key: string]: any }): CategoryEntity {
        
        const { id, name, SubCategory, Product } = object;
        
        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!name) throw CustomError.badRequest('Missing name');

        // Mapear subcategorías desde el objeto si existe
        const subCategories = SubCategory ? SubCategory.map((subCategoryObject: any) => SubCategoryEntity.fromObject(subCategoryObject)) : [];

        // Mapear productos desde el objeto si existe
        const products = Product ? Product.map((productObject: any) => ProductEntity.fromObject(productObject)) : [];

        return new CategoryEntity(id, name, subCategories, products);
    }
}
