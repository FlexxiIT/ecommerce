
import { prisma } from "../../data/postgres";
import { CreateProductDto, CustomError, PaginationDto, ProductEntity } from "../../domain";




export class ProductService {

    // DI
    constructor() { }


    async createProduct(createProductDto: CreateProductDto) {

        const productExists = await prisma.product.findFirst({ where: { name: createProductDto.name } });
        if (productExists) throw CustomError.badRequest('Product already exists');

        try {

            const product = await prisma.product.create({ data: createProductDto });
            
            return ProductEntity.fromObject(product);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
    
        try {
            const total = await prisma.product.count();
            const products = await prisma.product.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
    
            return {
                page,
                limit,
                total,
                next: (page * limit < total) ? `/api/product?page=${page + 1}&limit=${limit}` : null,
                prev: (page - 1 > 0) ? `/api/product?page=${page - 1}&limit=${limit}` : null,
                products,
            };
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

}