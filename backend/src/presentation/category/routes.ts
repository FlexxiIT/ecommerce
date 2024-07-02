import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoryService } from '../services';




export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();


        const categoryService = new CategoryService();

        const controller = new CategoryController(categoryService);

        // Definir las rutas
        router.post('/', controller.createCategory);
        router.get('/', controller.getCategories);
        // todo: Make it only usable with an admin token
        router.put('/', controller.modifyCategory);
        router.delete('/', controller.deleteCategory);
        

        return router;
    }


}

