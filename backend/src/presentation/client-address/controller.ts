import { Request, Response } from "express";
import { CreateAddressDto } from "../../domain/dtos/client-adress/create-adress.dto";
import { AdressService } from "../services/address.service";
import { ModifyAddressDto } from "../../domain/dtos/client-adress/modify-adress-dto";
import { handleError } from "../../config";




export class ClientAdressController {

    constructor(
        private readonly adressService: AdressService,
    ) { }

    getAddress = (req: Request, res: Response) => {

        this.adressService.getClientAddress(req.body.user.id)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    };

    createAddress = (req: Request, res: Response) => {

        const [error, createAdressDto] = CreateAddressDto.create({ ...req.body, clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.adressService.createClientAddress(createAdressDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    };

    modifyAddress = (req: Request, res: Response) => {

        const [error, modifyAddressDto] = ModifyAddressDto.create({ ...req.body, clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.adressService.modifyClientAddress(modifyAddressDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    };

}