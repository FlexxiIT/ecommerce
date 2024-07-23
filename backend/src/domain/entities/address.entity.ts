import { isUUID } from "../../config";
import { CustomError } from "../errors/custom-error";


export class AddressEntity {

    constructor(
        public id: string,
        public streetName: string,
        public streetNumber: string,
        public floor: string,
        public apartment: string,
        public locality: string,
        public city: string,
        public state: string,
        public provinceCode: string,
        public postalCode: string,
        public clientId: string,
    ) { }

    static fromObject(object: { [key: string]: any }): AddressEntity {
        const { id, streetName, streetNumber, floor, apartment, locality, city, state, provinceCode, postalCode, clientId } = object;

        if (!id) throw CustomError.badRequest('Missing id');
        if (!isUUID(id)) throw CustomError.badRequest('Id is not a valid UUID');
        if (!streetName) throw CustomError.badRequest('Missing street name');
        if (!streetNumber) throw CustomError.badRequest('Missing street number');
        if (!floor) throw CustomError.badRequest('Missing floor');
        if (!apartment) throw CustomError.badRequest('Missing apartment');
        if (!locality) throw CustomError.badRequest('Missing locality');
        if (!city) throw CustomError.badRequest('Missing city');
        if (!state) throw CustomError.badRequest('Missing state');
        if (!provinceCode) throw CustomError.badRequest('Missing province code');
        if (!postalCode) throw CustomError.badRequest('Missing postal code');
        if (!clientId) throw CustomError.badRequest('Missing clientId');
        if (!isUUID(clientId)) throw CustomError.badRequest('clientId is not a valid UUID');

        return new AddressEntity(id, streetName, streetNumber, floor, apartment, locality, city, state, provinceCode, postalCode, clientId);
    }
}
