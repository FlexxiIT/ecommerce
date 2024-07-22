import { Request, Response } from "express";
import { ShippingService } from "../services/shipping.service";




export class ShippingController {

    constructor(
        public readonly shippingService: ShippingService,
    ) { }

    registerSender = (req: Request, res: Response) => {

        res.json('Works')

    }

    

}