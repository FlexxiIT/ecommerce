import { isUUID } from "../../../config";

export class ModifyAddressDto {

    constructor(
        public readonly addressId: string,
        public readonly clientId: string,
        public readonly streetName?: string,
        public readonly streetNumber?: string,
        public readonly floor?: string,
        public readonly apartment?: string,
        public readonly locality?: string,
        public readonly city?: string,
        public readonly state?: string,
        public readonly provinceCode?: string,
        public readonly postalCode?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ModifyAddressDto?] {

        const { addressId, clientId, streetName, streetNumber, floor, apartment, locality, city, state, provinceCode, postalCode } = object;

        if (!addressId) return ['Missing addressId'];
        if (!isUUID(addressId)) return ['The addressId is not valid'];
        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['The clientId is not valid'];

        return [undefined, new ModifyAddressDto(
            addressId,
            clientId,
            streetName,
            streetNumber,
            floor,
            apartment,
            locality,
            city,
            state,
            provinceCode,
            postalCode)];
    }
}