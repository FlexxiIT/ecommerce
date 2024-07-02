import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services';
import { FileTypeMiddleware } from '../middlewares/file-upload.middleware';
import { ImageService } from '../services/image.service';




export class ProductRoutes {


    static get routes(): Router {

        const router = Router();

        const imageService = new ImageService();
        const productService = new ProductService(imageService);

        const controller = new ProductController(productService);

        // Definir las rutas
        router.post('/', [FileTypeMiddleware.validateExtension], controller.createProduct);  //todo: Corregir el descuento para los pedidos / Token de admin
        router.get('/', controller.getProducts);
        router.get('/category/:categoryId', controller.getProductsByCategory);
        router.get('/word/:word', controller.getProductsByWord);
        router.get('/sub-category/:subCategoryId', controller.getProductsBySubCategory);
        // todo: delete routes / FOR THE ADMIN ROLE

        router.put('/', controller.modifyProduct); //todo: Token de admin

        return router;
    }

}

