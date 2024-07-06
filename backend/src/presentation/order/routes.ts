import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OrderService } from "../services/order.service";
import { OrderController } from "./controller";
import { PaymentService } from "../services";





export class OrderRoutes {

    constructor() {} 

    static get routes() {

        const router = Router();

        const paymentService = new PaymentService();

        const orderService = new OrderService(paymentService);

        const controller = new OrderController(orderService);

        router.get('/show-initial-order', [AuthMiddleware.validateJWT], controller.showOrder);
        router.get('/actives', [AuthMiddleware.validateJWT], controller.showActiveOrders);
        router.get('/all-orders', [AuthMiddleware.validateJWT], controller.showAllOrders);

        router.post('/', [AuthMiddleware.validateJWT], controller.createOrder);
        
        return router;

    }

}