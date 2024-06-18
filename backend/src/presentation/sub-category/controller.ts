import { Request, Response } from "express";
import { CreateCategoryDto, CreateSubCategoryDto, CustomError } from "../../domain";
import { SubCategoryService } from "../services";
import { handleError } from "../../config";



export class SubCategoryController {

    //DI
    constructor(
        private readonly subCategoryService: SubCategoryService
    ) { }

    createSubCategory = (req: Request, res: Response) => {
        const [error, createSubCategoryDto] = CreateSubCategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });
    
        this.subCategoryService.createSubCategory(createSubCategoryDto!)
            .then(subCategory => res.status(201).json(subCategory))
            .catch(error => handleError(res, error));
    };

    getSubCategories = (req: Request, res: Response) => {

        this.subCategoryService.getSubCategories()
            .then(subCategories => res.json({ subCategories }))
            .catch(error => handleError(res, error));

    };

}