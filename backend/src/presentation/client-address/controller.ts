import { Request, Response } from "express";
import { CreateAddressDto } from "../../domain/dtos/client-adress/create-adress.dto";
import { AdressService } from "../services/address.service";
import { CustomError } from "../../domain";
import { ModifyAddressDto } from "../../domain/dtos/client-adress/modify-adress-dto";




export class ClientAdressController {

    constructor(
        private readonly adressService: AdressService,
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    getAddress = (req: Request, res: Response) => {

        this.adressService.getClientAddress(req.body.user.id)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    };

    createAddress = (req: Request, res: Response) => {

        const [error, createAdressDto] = CreateAddressDto.create({ ...req.body, clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.adressService.createClientAddress(createAdressDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    };

    modifyAddress = (req: Request, res: Response) => {

        const [error, modifyAddressDto] = ModifyAddressDto.create({ ...req.body, clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.adressService.modifyClientAddress(modifyAddressDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    };

}