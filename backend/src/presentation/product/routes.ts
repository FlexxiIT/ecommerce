import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services';
import { FileTypeMiddleware } from '../middlewares/file-upload.middleware';
import { ImageService } from '../services/image.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';




export class ProductRoutes {


    static get routes(): Router {

        const router = Router();

        const imageService = new ImageService();
        const productService = new ProductService(imageService);

        const controller = new ProductController(productService);

        // Definir las rutas
        router.post('/', [FileTypeMiddleware.validateExtension, AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.createProduct);  //todo: Corregir el descuento para los pedidos / Token de admin
        router.get('/', controller.getProducts);
        router.get('/category/:categoryId', controller.getProductsByCategory);
        router.get('/word/:word', controller.getProductsByWord);
        router.get('/sub-category/:subCategoryId', controller.getProductsBySubCategory);

        router.put('/', [AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.modifyProduct);
        router.put('/change-availability', [AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.changeProductAvailability); //todo: Es necesario mostrar los productos disponibles a los usuarios y solo los no disponibles en el apartado del admin

        return router;
    }

}

