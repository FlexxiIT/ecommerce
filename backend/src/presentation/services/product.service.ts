
import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { CreateProductDto, CustomError, PaginationDto, ProductEntity } from "../../domain";
import { ImageService } from "./image.service";
import { UploadedFile } from "express-fileupload";
import { ProductImageEntity } from "../../domain/entities/product-image.entity";


export interface ProductOptions {
    paginationDto: PaginationDto,
    urlParameter?: string,
    where?: Prisma.ProductWhereInput,
    orderBy?: Prisma.ProductOrderByWithRelationInput[],
    secImg?: string,
}

export class ProductService {

    // DI
    constructor(
        private readonly imageService: ImageService,
    ) { }

    async createProduct(createProductDto: CreateProductDto, imageFiles: UploadedFile[]) {

        const productExists = await prisma.product.findFirst({ where: { name: createProductDto.name } });
        if (productExists) throw CustomError.badRequest('Product already exists');

        try {

            const uploadImagesResult = await this.imageService.uploadImages(imageFiles);
            let productImages = [];

            const result = await prisma.$transaction(async (prisma) => {
                const product = await prisma.product.create({
                    data: {
                        ...createProductDto,
                        primaryImage: uploadImagesResult[0]?.secure_url
                    }
                });

                for (const image of uploadImagesResult!) {
                    const productImage = await prisma.productImage.create({
                        data: {
                            url: image.secure_url,
                            productId: product.id,
                            isPrimary: image.secure_url === product.primaryImage
                        }
                    });
                    productImages.push(productImage);
                }

                return { product, productImages };
            });

            return {
                product: ProductEntity.fromObject(result.product),
                productImages: result.productImages.map(ProductImageEntity.fromObject)
            };

        } catch (error) {

            throw CustomError.internalServer(`${error}`);
        }

    }

    async getProductsCommon(productOptions: ProductOptions) {
        const { paginationDto, orderBy, urlParameter = '/', where, secImg } = productOptions;
        const { page, limit } = paginationDto;

        try {
            const total = await prisma.product.count({ where: where });
            const products = await prisma.product.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: where,
                orderBy: orderBy
            });

            const productsEntities = products.map(product => ProductEntity.fromObject(product));

            let productsWithImages = productsEntities;
            
            if (secImg === "true") {
                productsWithImages = await Promise.all(productsEntities.map(async product => {
                    const productImages = await prisma.productImage.findMany({
                        where: { productId: product.id }
                    });
                    const productImageEntities = productImages.map(image => ProductImageEntity.fromObject(image));
                    return {
                        ...product,
                        images: productImageEntities
                    };
                }));
            }

            return {
                page,
                limit,
                total,
                next: (page * limit < total) ? `/api/product${urlParameter}?page=${page + 1}&limit=${limit}` : null,
                prev: (page - 1 > 0) ? `/api/product${urlParameter}?page=${page - 1}&limit=${limit}` : null,
                products: productsWithImages,
            };
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

}