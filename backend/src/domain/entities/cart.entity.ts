import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { CartItemEntity } from "./cart-item.entity";

enum CartStatus {
    ACTIVE,
    COMPLETED,
    CANCELLED,
}

export class CartEntity {

    constructor(
        public id: string,
        public clientId: string,
        public items: CartItemEntity[],
        public status: CartStatus,
    ) { }

    static fromObject(object: { [key: string]: any }): CartEntity {
        const { id, clientId, CartItems, status } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!clientId) throw CustomError.badRequest('Missing clientId');
        if (!isUUID(clientId)) throw CustomError.badRequest('Client Id is not a valid Id');

        const cartItems = CartItems ? CartItems.map((cartItemObject: any) => CartItemEntity.fromObject(cartItemObject)) : [];

        return new CartEntity(id, clientId, cartItems, status);
    }
}
