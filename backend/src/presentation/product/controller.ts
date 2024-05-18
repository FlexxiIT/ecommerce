import { Request, Response } from "express";
import { CustomError, CreateProductDto, PaginationDto } from "../../domain";
import { ProductService } from "../services";
import { Prisma } from "@prisma/client";




export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

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

        this.productService.createProduct(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res));

    };

    getProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy } = req.query as { page: string; limit: string; orderBy?: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            orderBy: orderByParams,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));
    }

    getProductsByCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy } = req.query as { page: string; limit: string; orderBy?: string };
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
            urlParameter: '/category',
            where: where,
            orderBy: orderByParams,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }

    getProductsByWord = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy } = req.query as { page: string; limit: string; orderBy?: string };
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { word } = req.params;
        const where: Prisma.ProductWhereInput = { name: { contains: word, mode:'insensitive' } };

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            urlParameter: '/category',
            where: where,
            orderBy: orderByParams,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }

    getProductsBySubCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10, orderBy } = req.query as { page: string; limit: string; orderBy?: string };
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
            urlParameter: '/sub-category',
            where: where,
            orderBy: orderByParams,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }



}