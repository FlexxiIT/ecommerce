import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaymentService } from "../services";
import { envs, handleError } from "../../config";




export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    successCase = (req: Request, res: Response) => { //todo: Hacer que desde el frontend se maneje cada caso
        console.log({ query_success: req.query });
        res.redirect(`${envs.WEB_URL}catalog`);
    };

    failureCase = (req: Request, res: Response) => {
        console.log(req);
        res.send('Payment failed');
    };

    pendingCase = (req: Request, res: Response) => {
        console.log(req);
        res.send('Payment pending');
    };

    webhookNotification = (req: Request, res: Response) => {

        this.paymentService.receiveWebhook(req)
            .then(resp => res.sendStatus(204))
            .catch(error => handleError(res, error));

    };



}