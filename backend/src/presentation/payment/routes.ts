import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PaymentService } from "../services";
import { PaymentController } from "./controller";




export class PaymentRoutes {

    constructor() { }

    static get routes() {

        const router = Router();

        const paymentService = new PaymentService();

        const controller = new PaymentController(paymentService);

        router.get('/success', [AuthMiddleware.validateJWT], controller.successCase);
        router.get('/failure', [AuthMiddleware.validateJWT], controller.failureCase);
        router.get('/pending', [AuthMiddleware.validateJWT], controller.pendingCase);

        router.post('/webhook', controller.webhookNotification);

        return router;

    }

}