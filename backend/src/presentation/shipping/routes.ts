import { Router } from "express";
import { ShippingController } from "./controller";
import { ShippingService } from "../services/shipping.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";




export class ShippingRoutes {

    constructor() { }

    static get routes(): Router {

        const router = Router();

        const shippingService = new ShippingService();

        const controller = new ShippingController(shippingService);

        router.post('/register-sender', [AuthMiddleware.validateJWT], controller.registerSender);

        return router;

    }

}