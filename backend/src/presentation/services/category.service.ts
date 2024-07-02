import { prisma } from "../../data/postgres";
import { CategoryEntity, CreateCategoryDto, CustomError } from "../../domain";
import { DeleteCategoryDto } from "../../domain/dtos/category/delete-category.dto";
import { ModifyCategoryDto } from "../../domain/dtos/category/modify-category.dto";





export class CategoryService {

    // DI
    constructor() { }


    async createCategory(createCategoryDto: CreateCategoryDto) {

        const categoryExists = await prisma.category.findFirst({ where: { name: createCategoryDto.name } });
        if (categoryExists) throw CustomError.badRequest('Category already exists');

        try {

            const category = await prisma.category.create({
                data: {
                    name: createCategoryDto.name,
                }
            });

            return CategoryEntity.fromObject(category);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getCategories() {

        try {

            const categories = await prisma.category.findMany({
                include: {
                    SubCategory: true,
                }
            });

            return categories.map(category => CategoryEntity.fromObject(category)); // Se retornan las entidades de las categorias.

        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }

    }

    async modifyCategory(modifyCategoryDto: ModifyCategoryDto) {

        const category = await prisma.category.findFirst({
            where: { id: modifyCategoryDto.categoryId }
        });

        if (!category) throw CustomError.notFound(`Category with id : ${modifyCategoryDto.categoryId} not found.`);

        try {

            const modifiedCategory = await prisma.category.update({
                where: { id: modifyCategoryDto.categoryId },
                data: modifyCategoryDto
            });

            return CategoryEntity.fromObject(modifiedCategory);

        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }

    }

    async deleteCategory(deleteCategoryDto: DeleteCategoryDto) {

        const category = await prisma.category.findUnique({ where: { id: deleteCategoryDto.categoryId } });

        if (!category) {
            throw CustomError.notFound(`Category with id: ${deleteCategoryDto.categoryId} not found.`);
        }

        try {
            await prisma.$transaction(async (prisma) => {
                await prisma.subCategory.deleteMany({ where: { id: deleteCategoryDto.categoryId } });
                await prisma.category.delete({ where: { id: deleteCategoryDto.categoryId } });
            });
        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }

    }

}