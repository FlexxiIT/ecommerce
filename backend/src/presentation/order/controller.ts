import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ShowCreateOrderDto } from "../../domain/dtos/order/show-create-order.dto";
import { CustomError } from "../../domain";
import { ModifyOrderDto } from "../../domain/dtos/order/modify-order.dto";




export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };


    showOrder = (req: Request, res: Response) => {

        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showOrder(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    }

    showActiveOrders = (req: Request, res: Response) => {

        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showActualOrders(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    }

    showAllOrders = (req: Request, res: Response) => {
        const [error, showOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.showAllOrders(showOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));
    }

    createOrder = (req: Request, res: Response) => {

        const [error, createOrderDto] = ShowCreateOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

        this.orderService.createOrder(createOrderDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));
    }

    modifyOrder = (req: Request, res: Response) => {

        const [error, modifyOrderDto] = ModifyOrderDto.create({ clientId: req.body.user.id });
        if (error) res.status(400).json({ error });

    }


}