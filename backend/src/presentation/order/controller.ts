import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ShowCreateOrderDto } from "../../domain/dtos/order/show-create-order.dto";
import { ModifyOrderDto } from "../../domain/dtos/order/modify-order.dto";
import { handleError } from "../../config";




export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) { }

    showOrder = (req: Request, res: Response) => {

        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showOrder(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    }

    showActiveOrders = (req: Request, res: Response) => {

        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showActualOrders(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    }

    showAllOrders = (req: Request, res: Response) => {
        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showAllOrders(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));
    }

    createOrder = (req: Request, res: Response) => {

        const [error, createOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.createOrder(createOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));
    }

}