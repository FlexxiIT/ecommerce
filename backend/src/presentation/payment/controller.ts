import { Request, Response } from "express";
import { PaymentService } from "../services";
import { envs, handleError } from "../../config";




export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    successCase = (req: Request, res: Response) => {
        console.log({ query_success: req.query });
        res.redirect(`${envs.WEB_URL}payment/success`);
    };

    failureCase = (req: Request, res: Response) => {
        console.log(req);
        res.redirect(`${envs.WEB_URL}payment/failure`);
    };

    pendingCase = (req: Request, res: Response) => {
        console.log(req);
        res.redirect(`${envs.WEB_URL}payment/pending`);
    };

    webhookNotification = (req: Request, res: Response) => {

        this.paymentService.receiveWebhook(req)
            .then(resp => res.sendStatus(204))
            .catch(error => handleError(res, error));

    };



}