import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";





export class SubCategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public categoryId: string,
    ) { }

    static fromObject(object: { [key: string]: any }): SubCategoryEntity {
        const { id, name,categoryId } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('SubCategory Id is not a valid Id');
        if (!name) throw CustomError.badRequest('Missing name');
        if (!categoryId) throw CustomError.badRequest('Missing category id');
        if (!isUUID(categoryId)) throw CustomError.badRequest('Category Id is not a valid Id');

        return new SubCategoryEntity(id, name, categoryId);
    }

}