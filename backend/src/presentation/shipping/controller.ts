import { Request, Response } from "express";
import { ShippingService } from "../services/shipping.service";
import { RegisterSenderDto } from "../../domain/dtos/shipping/register-sender.dto";
import { handleError } from "../../config";
import { ValidateSenderDto } from "../../domain/dtos/shipping/validate-sender.dto";
import { GetRatesDto } from "../../domain/dtos/shipping/get-rates.dto";
import { ImportShippingDto } from "../../domain/dtos/shipping/import-shipping.dto";




export class ShippingController {

    constructor(
        public readonly shippingService: ShippingService,
    ) { }

    registerSender = (req: Request, res: Response) => {

        const [error, registerSenderDto] = RegisterSenderDto.create({ ...req.body, clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.shippingService.registerShippingSender(registerSenderDto!)
            .then(resp => res.status(200).json(resp))
            .catch(error => handleError(res, error));
    }

    validateSender = (req: Request, res: Response) => {

        const [error, validateSenderDto] = ValidateSenderDto.create(req.body);
        if (error) res.status(400).json({ error });

        this.shippingService.validateShippingSender(validateSenderDto!)
            .then(resp => res.status(200).json(resp))
            .catch(error => handleError(res, error));

    }

    getRates = (req: Request, res: Response) => { //todo: hacer un middleware que obtenga el customer id desde un token.

        const [error, getRatesDto] = GetRatesDto.create(req.body);
        if (error) res.status(400).json({ error });

        this.shippingService.getShippingRates(getRatesDto!)
            .then(resp => res.status(200).json(resp))
            .catch(error => handleError(res, error));

    }

    importShipping = (req: Request, res: Response) => {

        const [error, importShippingDto] = ImportShippingDto.create(req.body);
        if (error) res.status(400).json({ error });

        this.shippingService.importShipping(importShippingDto!)
            .then(resp => res.status(200).json(resp))
            .catch(error => handleError(res, error));

    }


}