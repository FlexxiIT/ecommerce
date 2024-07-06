
import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { CreateProductDto, CustomError, PaginationDto, ProductEntity } from "../../domain";
import { ImageService } from "./image.service";
import { UploadedFile } from "express-fileupload";
import { ProductImageEntity } from "../../domain/entities/product-image.entity";
import { ModifyProductDto } from "../../domain/dtos/product/modify-product.dto";
import { ChangeProductAvailabilityDto } from "../../domain/dtos/product/change-product-availability.dto";


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

            const primaryImage = uploadImagesResult[0] ? this.imageService.transformSingleImage(uploadImagesResult[0].public_id) : undefined;

            const result = await prisma.$transaction(async (prisma) => {
                const product = await prisma.product.create({
                    data: {
                        ...createProductDto,
                        primaryImage: primaryImage
                    }
                });

                for (const uploadResult of uploadImagesResult!) {
                    const urls = this.imageService.transformImagesUrl(uploadResult.public_id);

                    for (const [size, url] of Object.entries(urls)) {
                        const productImage = await prisma.productImage.create({
                            data: {
                                url: url,
                                productId: product.id,
                                size: size,
                                isPrimary: uploadResult.secure_url === product.primaryImage
                            }
                        });
                        productImages.push(productImage);
                    }
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

    async modifyProduct(modifyProductDto: ModifyProductDto) {

        const product = await prisma.product.findUnique({
            where: { id: modifyProductDto.productId }
        });

        if (!product) throw CustomError.notFound(`Product with id : ${modifyProductDto.productId} not found.`);

        try {

            const { productId, ...dataToModify } = modifyProductDto;

            const modifiedProduct = await prisma.product.update({
                where: { id: modifyProductDto.productId },
                data: dataToModify
            });

            return ProductEntity.fromObject(modifiedProduct);

        } catch (error) {
            throw new Error("Internal server error" + error);
        }

    }

    async changeProductAvailability(changeProductAvailabilityDto: ChangeProductAvailabilityDto) {

        const product = await prisma.product.findUnique({
            where: { id: changeProductAvailabilityDto.productId }
        });

        if (!product) throw CustomError.notFound(`Product with id : ${changeProductAvailabilityDto.productId} not found.`);

        try {

            const modifiedProduct = await prisma.product.update({
                where: { id: changeProductAvailabilityDto.productId },
                data: { available: !product.available }
            });

            return ProductEntity.fromObject(modifiedProduct);

        } catch (error) {
            throw new Error("Internal server error");
        }

    }

}