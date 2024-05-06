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

    createProduct = (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.createProduct(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res));

    };

    getProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        this.productService.getProductsCommon(paginationDto!)
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));
    }

    getProductsByCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { categoryId } = req.params;
        const where: Prisma.ProductWhereInput = { categoryId: categoryId };

        this.productService.getProductsCommon(
            paginationDto!,
            '/category',
            where
        )
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }

    getProductsByWord = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { word } = req.params;
        const where: Prisma.ProductWhereInput = { name: { contains: word } };

        this.productService.getProductsCommon(
            paginationDto!,
            '/category',
            where
        )
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }

    getProductsBySubCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        const { subCategoryId } = req.params;
        const where: Prisma.ProductWhereInput = { subCategoryId: subCategoryId };

        this.productService.getProductsCommon(
            paginationDto!,
            '/sub-category',
            where
        )
            .then(products => res.status(200).json({ products }))
            .catch(error => this.handleError(error, res));

    }



}