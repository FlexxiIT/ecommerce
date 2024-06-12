import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";


export class AddressEntity {

    constructor(
        public id: string,
        public street: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public clientId: string,
    ) { }

    static fromObject(object: { [key: string]: any }): AddressEntity {
        const { id, street, city, state, zipCode, clientId } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Category Id is not a valid Id');
        if (!street) throw CustomError.badRequest('Missing street');
        if (!city) throw CustomError.badRequest('Missing city');
        if (!state) throw CustomError.badRequest('Missing state');
        if (!zipCode) throw CustomError.badRequest('Missing zipCode');
        if (!clientId) throw CustomError.badRequest('Missing clientId');
        if (!isUUID(clientId)) throw CustomError.badRequest('clientId is not a valid Id');

        return new AddressEntity(id, street, city, state, zipCode, clientId);
    }
}
