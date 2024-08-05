import { Router } from "express";
import { ShippingController } from "./controller";
import { ShippingService } from "../services/shipping.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ShippingAuthService } from "../services/shipping-auth.service";




export class ShippingRoutes {

    constructor() { }

    static get routes(): Router {

        const router = Router();

        const shippingService = new ShippingService(new ShippingAuthService());

        const controller = new ShippingController(shippingService);

        router.post('/register-sender', [AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.registerSender);
        router.post('/validate-sender', [AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.validateSender);
        router.post('/get-rates', [AuthMiddleware.validateJWT], controller.getRates); //No es necesario que sea admin ya que los precios los tiene que poder ver el cliente
        router.post('/import-shipping', [AuthMiddleware.validateJWT, AuthMiddleware.isAdmin], controller.importShipping);

        return router;

    }

}