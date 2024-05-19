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
        router.get('/category/:categoryId', controller.getProductsByCategory);
        router.get('/word/:word', controller.getProductsByWord);
        router.get('/sub-category/:subCategoryId', controller.getProductsBySubCategory); // todo: Check if subcategory exist in the category table before create a product
        // todo: update and delete routes / FOR THE ADMIN ROLE

        return router;
    }

}

