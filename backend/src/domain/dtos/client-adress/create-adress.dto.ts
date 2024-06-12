import { isUUID } from "../../../config";




export class CreateAddressDto {

    constructor(
        public readonly street: string,
        public readonly city: string,
        public readonly state: string,
        public readonly zipCode: string,
        public readonly clientId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateAddressDto?] {

        const { street, city, state, zipCode, clientId } = object;

        if (!street) return ['Missing street'];
        if (!city) return ['Missing city'];
        if (!state) return ['Missing state'];
        if (!zipCode) return ['Missing zipCode'];
        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['The clientId is not valid'];

        return [undefined, new CreateAddressDto(street, city, state, zipCode, clientId)];

    }

}