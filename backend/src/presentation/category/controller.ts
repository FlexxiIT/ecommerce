import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services";



export class CategoryController {

    //DI
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });
    
        this.categoryService.createCategory(createCategoryDto!)
            .then(category => res.status(201).json(category))
            .catch(error => this.handleError(res, error));
    };

    getCategories = (req: Request, res: Response) => {

        this.categoryService.getCategories()
            .then(categories => res.json({ categories }))
            .catch(error => this.handleError(res, error));

    };

}