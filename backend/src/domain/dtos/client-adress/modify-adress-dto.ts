import { isUUID } from "../../../config";

export class ModifyAddressDto {

    constructor(
        public readonly addressId: string,
        public readonly clientId: string,
        public readonly street?: string,
        public readonly city?: string,
        public readonly state?: string,
        public readonly zipCode?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ModifyAddressDto?] {

        const { addressId, clientId, street, city, state, zipCode } = object;

        if (!addressId) return ['Missing addressId'];
        if (!isUUID(addressId)) return ['The addressId is not valid'];
        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['The clientId is not valid'];

        return [undefined, new ModifyAddressDto(addressId, clientId, street, city, state, zipCode)];
    }
}