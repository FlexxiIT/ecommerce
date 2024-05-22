import { SubCategoryEntity } from "..";
import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { ProductEntity } from "./product.entity";


export class CartItemEntity {

    constructor(
        public id: string,
        public cartId: string,
        public productId: string,
        public quantity: number,
    ) { }

    static fromObject(object: { [key: string]: any }): CartItemEntity {
        const { id, cartId, productId, quantity } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!cartId) throw CustomError.badRequest('Missing cart id');
        if (!isUUID(cartId)) throw CustomError.badRequest('Cart Id is not a valid Id');
        if (!productId) throw CustomError.badRequest('Missing cart id');
        if (!isUUID(productId)) throw CustomError.badRequest('Product Id is not a valid Id');
        if (!quantity) throw CustomError.badRequest('Missing quantity');

        return new CartItemEntity(id, cartId, productId, quantity);
    }
}
