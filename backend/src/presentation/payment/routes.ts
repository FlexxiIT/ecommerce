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

        //todo: colocar autenticación
        router.get('/success', controller.successCase);
        router.get('/failure', controller.failureCase);
        router.get('/pending', controller.pendingCase);

        router.post('/webhook', controller.webhookNotification);

        return router;

    }

}