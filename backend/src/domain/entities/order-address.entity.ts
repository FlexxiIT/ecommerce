import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";


export class OrderAddress {

    constructor(
        public id: string,
        public orderId: string,
        public street: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public createdAt: Date,
    ) { }

    static fromObject(object: { [key: string]: any }): OrderAddress {
        const { id, orderId, street, city, state, zipCode, createdAt } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Address id is not a valid Id');
        if (!orderId) throw CustomError.badRequest('Missing id');
        if (!isUUID(orderId)) throw CustomError.badRequest('Order Id is not a valid Id');
        if (!street) throw CustomError.badRequest('Missing street');
        if (!city) throw CustomError.badRequest('Missing city');
        if (!state) throw CustomError.badRequest('Missing state');
        if (!zipCode) throw CustomError.badRequest('Missing zipCode');
        if (!createdAt) throw CustomError.badRequest('Missing createdAt');

        return new OrderAddress(id, orderId, street, city, state, zipCode, createdAt);
    }
}
