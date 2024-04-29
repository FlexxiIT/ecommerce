import { prisma } from "../../data/postgres";
import { CategoryEntity, CreateCategoryDto, CustomError } from "../../domain";





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

            const categoryEntity = CategoryEntity.fromObject(category);

            return categoryEntity;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getCategories() {

        try {

          const categories = await prisma.category.findMany();

          const categoriesEntity = categories.map(category => CategoryEntity.fromObject(category));

          return categoriesEntity;

        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }

    }

}