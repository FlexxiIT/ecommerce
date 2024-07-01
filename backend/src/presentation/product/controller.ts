import { Request, Response } from "express";
import { CustomError, CreateProductDto, PaginationDto } from "../../domain";
import { ProductService } from "../services";
import { Prisma } from "@prisma/client";
import { handleError } from "../../config";
import { UploadedFile } from 'express-fileupload'



export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    // Función para parsear el parámetro orderBy
    private parseOrderBy(orderByQuery: string): Prisma.ProductOrderByWithRelationInput[] {
        return orderByQuery.split(',').map(param => {
            const [field, order] = param.split(':');
            return { [field]: order };
        });
    }

    createProduct = (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.createProduct(createProductDto!, req.body.files)
            .then(product => res.status(201).json(product))
            .catch(error => handleError(res, error));

    };

    getProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy, secImg } = req.query as { page: string; limit: string; orderBy?: string, secImg: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            orderBy: orderByParams,
            secImg: secImg,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => handleError(res, error));
    }

    getProductsByCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy, secImg } = req.query as { page: string; limit: string; orderBy?: string, secImg: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { categoryId } = req.params;
        const where: Prisma.ProductWhereInput = { categoryId: categoryId };

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            urlParameter: `/category/${categoryId}`,
            where: where,
            orderBy: orderByParams,
            secImg: secImg,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => handleError(res, error));

    }

    getProductsByWord = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy, secImg } = req.query as { page: string; limit: string; orderBy?: string, secImg: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { word } = req.params;
        const where: Prisma.ProductWhereInput = { name: { contains: word, mode: 'insensitive' } };

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            urlParameter: `/word/${word}`,
            where: where,
            orderBy: orderByParams,
            secImg: secImg,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => handleError(res, error));

    }

    getProductsBySubCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy, secImg } = req.query as { page: string; limit: string; orderBy?: string, secImg: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { subCategoryId } = req.params;
        const where: Prisma.ProductWhereInput = { subCategoryId: subCategoryId };

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            urlParameter: `/sub-category/${subCategoryId}`,
            where: where,
            orderBy: orderByParams,
            secImg: secImg
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => handleError(res, error));

    }



}