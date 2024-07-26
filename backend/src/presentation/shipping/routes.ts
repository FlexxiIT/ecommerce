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

        router.post('/register-sender', [AuthMiddleware.validateJWT], controller.registerSender);//todo: hacer que solo el admin pueda acceder al los endpoint
        router.post('/validate-sender', [AuthMiddleware.validateJWT], controller.validateSender);

        return router;

    }

}