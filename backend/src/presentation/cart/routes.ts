import { Router } from "express";
import { CartService } from "../services";
import { CartController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";




export class CartRouter {

    constructor() { }

    static get routes(): Router {

        const router = Router();

        const cartService = new CartService();

        const controller = new CartController(cartService);

        router.get('/', [AuthMiddleware.validateJWT], controller.getCart);

        router.post('/item', [AuthMiddleware.validateJWT], controller.addItemToCart);
        
        router.put('/', [AuthMiddleware.validateJWT], controller.modifyQuantityFromCart);

        router.delete('/', [AuthMiddleware.validateJWT], controller.deleteItemFromCart)

        return router;

    }


}