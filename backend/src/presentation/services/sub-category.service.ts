import { prisma } from "../../data/postgres";
import { CreateSubCategoryDto, CustomError, SubCategoryEntity } from "../../domain";





export class SubCategoryService {

    // DI
    constructor() { }


    async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {

        const subCategoryExists = await prisma.subCategory.findFirst({ where: { name: createSubCategoryDto.name } });
        if (subCategoryExists) throw CustomError.badRequest('Sub Category already exists');

        try {

            const category = await prisma.category.findFirst({
                where: { id: createSubCategoryDto.categoryId }
            });

            if(!category) throw CustomError.notFound(`Category not found, can't create sub category`); 

            const subCategory = await prisma.subCategory.create({
                data: {
                    name: createSubCategoryDto.name,
                    categoryId: createSubCategoryDto.categoryId,
                }
            });

            const subCategoryEntity = SubCategoryEntity.fromObject(subCategory);

            return subCategoryEntity;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getSubCategories() {

        try {

            const subCategories = await prisma.subCategory.findMany();

            const subCategoriesEntity = subCategories.map(category => SubCategoryEntity.fromObject(category));

            return subCategoriesEntity;

        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }

    }

}