import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";
import { ProductEntity } from "./product.entity";


export class OrderItemEntity {

    constructor(
        public id: string,
        public productId: string,
        public orderId: string,
        public quantity: number,
        public price?: number,
        public product?: ProductEntity,
    ) { }

    static fromObject(object: { [key: string]: any }): OrderItemEntity {
        const { id, productId, orderId, quantity, price, product } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!productId) throw CustomError.badRequest('Missing product id');
        if (!isUUID(productId)) throw CustomError.badRequest('Product Id is not a valid Id');
        if (!quantity) throw CustomError.badRequest('Missing quantity');

        const productEntity = product ? ProductEntity.fromObject(product) : undefined;

        return new OrderItemEntity(id, productId, orderId, quantity, price, productEntity);
    }
}
