import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services';




export class ProductRoutes {


    static get routes(): Router {

        const router = Router();

        const productService = new ProductService();

        const controller = new ProductController(productService);

        // Definir las rutas
        router.post('/', controller.createProduct);
        router.get('/', controller.getProducts);
        // todo: update and delete routes / FOR THE ADMIN ROLE

        return router;
    }

}

