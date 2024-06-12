import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ClientAdressController } from "./controller";
import { AdressService } from "../services/address.service";




export class ClientAddressRouter {

    constructor() { }

    static get routes() {

        const router = Router();

        const adressService = new AdressService();

        const controller = new ClientAdressController(adressService);

        router.get('/', [AuthMiddleware.validateJWT], controller.getAddress);

        router.post('/', [AuthMiddleware.validateJWT], controller.createAddress);

        router.put('/', [AuthMiddleware.validateJWT], controller.modifyAddress);

        return router;

    }

}