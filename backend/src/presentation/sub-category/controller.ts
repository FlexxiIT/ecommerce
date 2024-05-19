import { Request, Response } from "express";
import { CreateCategoryDto, CreateSubCategoryDto, CustomError } from "../../domain";
import { SubCategoryService } from "../services";



export class SubCategoryController {

    //DI
    constructor(
        private readonly subCategoryService: SubCategoryService
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    createSubCategory = (req: Request, res: Response) => {
        const [error, createSubCategoryDto] = CreateSubCategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });
    
        this.subCategoryService.createSubCategory(createSubCategoryDto!)
            .then(subCategory => res.status(201).json(subCategory))
            .catch(error => this.handleError(res, error));
    };

    getSubCategories = (req: Request, res: Response) => {

        this.subCategoryService.getSubCategories()
            .then(subCategories => res.json({ subCategories }))
            .catch(error => this.handleError(res, error));

    };

}