import { Request, Response } from "express";
import { CreateProductDto, PaginationDto } from "../../domain";
import { ProductService } from "../services";
import { Prisma } from "@prisma/client";
import { handleError } from "../../config";
import { ModifyProductDto } from "../../domain/dtos/product/modify-product.dto";
import { ChangeProductAvailabilityDto } from "../../domain/dtos/product/change-product-availability.dto";

type QueryParams = {
    page: string;
    limit: string;
    orderBy?: string;
    secImg: string;
    minPrice?: string;
    maxPrice?: string;
};

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

    // Función para modularizar los parametros de los controladores
    private getQueryParams(req: Request): [null | string, PaginationDto | null, Prisma.ProductOrderByWithRelationInput[], string, Prisma.ProductWhereInput] {
        const { page = 1, limit = 10, orderBy, secImg, minPrice, maxPrice } = req.query as QueryParams;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return [error, null, [], secImg, {}];

        let orderByParams: Prisma.ProductOrderByWithRelationInput[] = [];
        if (orderBy) {
            orderByParams = this.parseOrderBy(orderBy);
        }

        let where: Prisma.ProductWhereInput = {};
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = +minPrice;
            if (maxPrice) where.price.lte = +maxPrice;
        }

        return [null, paginationDto!, orderByParams, secImg, where];
    }

    // Función para manejar el servicio de productos con los parametros de la req
    private handleGetProducts(req: Request, res: Response, additionalWhere: Prisma.ProductWhereInput, urlParameter: string) {
        const [error, paginationDto, orderByParams, secImg, priceWhere] = this.getQueryParams(req);
        if (error) return res.status(400).json({ error });

        const where = {
            ...priceWhere,
            ...additionalWhere
        };

        this.productService.getProductsCommon({
            paginationDto: paginationDto!,
            urlParameter: urlParameter,
            where: where,
            orderBy: orderByParams,
            secImg: secImg,
        })
            .then(products => res.status(200).json({ products }))
            .catch(error => handleError(res, error));
    }

    createProduct = (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.createProduct(createProductDto!, req.body.files)
            .then(product => res.status(201).json(product))
            .catch(error => handleError(res, error));

    };

    getProducts = (req: Request, res: Response) => {
        this.handleGetProducts(req, res, {}, '/');
    }

    getProductsByCategory = (req: Request, res: Response) => {
        const { categoryId } = req.params;
        this.handleGetProducts(req, res, { categoryId: categoryId }, `/category/${categoryId}`);
    }

    getProductsByWord = (req: Request, res: Response) => {
        const { word } = req.params;
        this.handleGetProducts(req, res, { name: { contains: word, mode: 'insensitive' } }, `/word/${word}`);
    }

    getProductsBySubCategory = (req: Request, res: Response) => {
        const { subCategoryId } = req.params;
        this.handleGetProducts(req, res, { subCategoryId: subCategoryId }, `/sub-category/${subCategoryId}`);
    }

    modifyProduct = (req: Request, res: Response) => { //todo: Modificar imagen principal en base a una nueva url o una imagen nueva?

        const [error, modifyProductDto] = ModifyProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.modifyProduct(modifyProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => handleError(res, error));

    }

    changeProductAvailability = (req: Request, res: Response) => {

        const [error, changeProductAvailabilityDto] = ChangeProductAvailabilityDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.productService.changeProductAvailability(changeProductAvailabilityDto!)
            .then(product => res.status(201).json(product))
            .catch(error => handleError(res, error));

    }

}