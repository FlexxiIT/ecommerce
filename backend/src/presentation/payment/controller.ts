import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaymentService } from "../services";




export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    successCase = (req: Request, res: Response) => {
        res.send('Payment success');
    };

    failureCase = (req: Request, res: Response) => {
        res.send('Payment failed');
    };

    pendingCase = (req: Request, res: Response) => {
        res.send('Payment pending');
    };

    webhookNotification = (req: Request, res: Response) => {
        console.log("webhook called");
        res.send('webhook');
    };



}