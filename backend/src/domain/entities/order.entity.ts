import { CartItem } from "@prisma/client";
import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { CartItemEntity } from "./cart-item.entity";

enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export class OrderEntity {

    constructor(
        public id: string,
        public clientId: string,
        public addressId: string,
        public cartItems: CartItem[],
        public status: OrderStatus,
        public createdAt: Date,
    ) { }

    static fromObject(object: { [key: string]: any }): OrderEntity {
        const { id, clientId, addressId, items, status, createdAt } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!clientId) throw CustomError.badRequest('Missing clientId');
        if (!isUUID(clientId)) throw CustomError.badRequest('clientId is not a valid Id');
        
        const cartItems = items ? items.map((cartItemObject: any) => CartItemEntity.fromObject(cartItemObject)) : [];

        if (!Object.values(OrderStatus).includes(status)) throw CustomError.badRequest('Invalid status');

        if(!createdAt) throw CustomError.badRequest('Missing createdAt');

        return new OrderEntity(id, clientId, addressId, cartItems, status, createdAt);
    }
}
