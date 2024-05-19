import { Router } from 'express';
import { SubCategoryService } from '../services';
import { SubCategoryController } from './controller';




export class SubCategoryRoutes {


    static get routes(): Router {

        const router = Router();


        const subCategoryService = new SubCategoryService();

        const controller = new SubCategoryController(subCategoryService);

        // Definir las rutas
        router.post('/', controller.createSubCategory);
        router.get('/', controller.getSubCategories);
        // todo: update and delete routes / FOR THE ADMIN ROLE

        return router;
    }


}

