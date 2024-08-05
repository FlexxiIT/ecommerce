import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";

export class OrderAddress {

    constructor(
        public id: string,
        public orderId: string,
        public streetName: string,
        public streetNumber: string,
        public floor: string,
        public apartment: string,
        public locality: string,
        public city: string,
        public provinceCode: string,
        public postalCode: string,
        public clientId: string,
    ) { }

    static fromObject(object: { [key: string]: any }): OrderAddress {
        const { id, orderId, streetName, streetNumber, floor, apartment, locality, city, provinceCode, postalCode, clientId } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Id is not a valid UUID');
        if (!orderId) throw CustomError.badRequest('Missing id');
        if (!isUUID(orderId)) throw CustomError.badRequest('Order Id is not a valid Id');
        if (!streetName) throw CustomError.badRequest('Missing street name');
        if (!streetNumber) throw CustomError.badRequest('Missing street number');
        if (!floor) throw CustomError.badRequest('Missing floor');
        if (!apartment) throw CustomError.badRequest('Missing apartment');
        if (!locality) throw CustomError.badRequest('Missing locality');
        if (!city) throw CustomError.badRequest('Missing city');
        if (!provinceCode) throw CustomError.badRequest('Missing province code');
        if (!postalCode) throw CustomError.badRequest('Missing postal code');
        if (!clientId) throw CustomError.badRequest('Missing clientId');
        if (!isUUID(clientId)) throw CustomError.badRequest('clientId is not a valid UUID');

        return new OrderAddress(id, orderId, streetName, streetNumber, floor, apartment, locality, city, provinceCode, postalCode, clientId);
    }
}

