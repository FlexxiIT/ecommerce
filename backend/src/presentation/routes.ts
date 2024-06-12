import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { SubCategoryRoutes } from './sub-category/routes';
import { ProductRoutes } from './product/routes';
import { CartRouter } from './cart/routes';
import { ClientAddressRouter } from './client-address/routes';
import { OrderRoutes } from './order/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/sub-category', SubCategoryRoutes.routes);
    router.use('/api/product', ProductRoutes.routes);
    router.use('/api/cart', CartRouter.routes);
    router.use('/api/address', ClientAddressRouter.routes);
    router.use('/api/order', OrderRoutes.routes);

    return router;
  }


}

