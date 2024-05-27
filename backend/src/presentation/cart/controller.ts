import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { CartService } from "../services";
import { AddToCartDto } from "../../domain/dtos/cart/add-item-to-cart.dto";
import { ModifyCartDto } from "../../domain/dtos/cart/modify-cart.dto";





export class CartController {

    constructor(
        private readonly cartService: CartService,
    ) { }

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    getCart = (req: Request, res: Response) => {

        this.cartService.getCart(req.body.user.id)
            .then(cart => res.json(cart))
            .catch(error => this.handleError(res, error));

    }

    addItemToCart = (req: Request, res: Response) => {
        const [error, addItemToCartDto] = AddToCartDto.create({ ...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.addToCart(addItemToCartDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error))
    }
    
    modifyQuantityFromCart = (req: Request, res: Response) => {

        const [error, modifyCartDto] = ModifyCartDto.create({...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.modifyQuantity(modifyCartDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    }

    deleteItemFromCart = (req: Request, res: Response) => {

        const [error, modifyCartDto] = ModifyCartDto.create({...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.removeItem(modifyCartDto!)
            .then(resp => res.json(resp))
            .catch(error => this.handleError(res, error));

    }



}