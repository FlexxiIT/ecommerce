import { Router } from "express";
import { CartService } from "../services";
import { CartController } from "./controller";




export class CartRouter {

    constructor() { }

    static get routes(): Router {

        const router = Router();

        const cartService = new CartService();

        const controller = new CartController(cartService);

        router.post('/item', controller.addItem);

        return router;

    }


}