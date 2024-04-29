import { isUUID } from "../../../config";




export class CreateSubCategoryDto {

    private constructor(

        public readonly name: string,
        public readonly categoryId: string,

    ) { }

    static create(object: { [key: string]: any }): [string?, CreateSubCategoryDto?] {

        const { name, categoryId } = object;

        if (!name) return ['Missing name'];
        if (!categoryId) return ['Missing Category Id'];
        if(!isUUID(categoryId)) return ['Category id is not a valid ID']

        return [undefined, new CreateSubCategoryDto(name, categoryId)];

    }


}