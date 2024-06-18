import { Request, Response } from "express";
import { CartService } from "../services";
import { AddToCartDto } from "../../domain/dtos/cart/add-item-to-cart.dto";
import { ModifyCartDto } from "../../domain/dtos/cart/modify-cart.dto";
import { handleError } from "../../config";





export class CartController {

    constructor(
        private readonly cartService: CartService,
    ) { }


    getCart = (req: Request, res: Response) => {

        this.cartService.getCart(req.body.user.id)
            .then(cart => res.json(cart))
            .catch(error => handleError(res, error));

    }

    addItemToCart = (req: Request, res: Response) => {
        const [error, addItemToCartDto] = AddToCartDto.create({ ...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.addToCart(addItemToCartDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error))
    }
    
    modifyQuantityFromCart = (req: Request, res: Response) => {

        const [error, modifyCartDto] = ModifyCartDto.create({...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.modifyQuantity(modifyCartDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    }

    deleteItemFromCart = (req: Request, res: Response) => {

        const [error, modifyCartDto] = ModifyCartDto.create({...req.body, clientId: req.body.user.id});
        if (error) return res.status(400).json({ error });

        this.cartService.removeItem(modifyCartDto!)
            .then(resp => res.json(resp))
            .catch(error => handleError(res, error));

    }



}