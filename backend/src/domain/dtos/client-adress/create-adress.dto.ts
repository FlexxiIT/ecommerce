import { isUUID } from "../../../config";




export class CreateAddressDto {

    constructor(
        public readonly streetName: string,
        public readonly streetNumber: string,
        public readonly floor: string,
        public readonly apartment: string,
        public readonly locality: string,
        public readonly city: string,
        public readonly state: string,
        public readonly provinceCode: string,
        public readonly postalCode: string,
        public readonly clientId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateAddressDto?] {

        const { streetName, streetNumber, floor, apartment, locality, city, state, provinceCode, postalCode, clientId } = object;

        if (!streetName) return ['Missing street name'];
        if (!streetNumber) return ['Missing street number'];
        if (!floor) return ['Missing floor'];
        if (!apartment) return ['Missing apartment'];
        if (!city) return ['Missing city'];
        if (!state) return ['Missing state'];
        if (!provinceCode) return ['Missing province code'];
        if (!postalCode) return ['Missing postal code'];
        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['The clientId is not valid'];

        return [undefined, new CreateAddressDto(streetName, streetNumber, floor, apartment, locality, city, state, provinceCode, postalCode, clientId)];

    }

}