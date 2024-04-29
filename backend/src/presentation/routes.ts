import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { SubCategoryRoutes } from './sub-category/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/sub-category', SubCategoryRoutes.routes);

    return router;
  }


}

