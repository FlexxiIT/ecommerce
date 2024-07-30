

export interface Address {
    streetName?: string,
    streetNumber?: string,
    floor?: string,
    apartment?: string,
    city?: string,
    provinceCode?: string,
    postalCode?: string,
}

export interface Sender {
    name?: string,
    phone?: string,
    cellPhone?: string,
    email?: string,
    originAddress?: Address
}

export interface Recipient {
    name: string,
    phone?: string,
    cellPhone?: string,
    email: string
}

export interface Shipping {
    deliveryType: string,
    agency?: string,
    address: Address,
    weight: number,
    declaredValue: number,
    height: number,
    length: number,
    width: number

}

const provinceCodePattern = /^[A-Z]$/;

export class ImportShippingDto {

    constructor(
        public readonly customerId: string,
        public readonly extOrderId: string,
        public readonly orderNumber: string,
        public readonly recipient: Recipient,
        public readonly shipping: Shipping,
        public readonly sender?: Sender,

    ) { }

    static create(object: { [key: string]: any }): [string?, ImportShippingDto?] { //todo: La mayoria de datos se van a tener que importar desde el panel de admin

        const { customerId, extOrderId, orderNumber, recipient, shipping, sender } = object;

        if (!customerId) return ['Missing customerId'];
        if (!extOrderId) return ['Missing extOrderId'];
        if (!orderNumber) return ['Missing orderNumber'];

        if (!recipient) return ['Missing recipient'];
        if (!recipient.name) return ['Missing recipient name'];
        if (!recipient.email) return ['Missing recipient email'];

        if (!shipping) return ['Missing shipping'];
        if (!shipping.deliveryType) return ['Missing deliveryType'];
        if (shipping.deliveryType === 'S') {
            if (!shipping.agency) return ['Missing agency for delivery type S (Sucursal)'];
        } else if (shipping.deliveryType === 'D') {
            if (!shipping.address || !shipping.address.postalCode) return ['Missing address for delivery type D (Domicilio)'];
        } else {
            return ['Invalid delivered type; must be "S" or "D"'];
        }
        if (shipping.weight <= 0) return ['Weight must be greater than 0'];
        if (shipping.weight > 25000) return ['Weight exceeds maximum allowed limit']; //En gramos
        if (shipping.height <= 0 || shipping.height > 255) return ['Height must be between 0 and 255'];
        if (shipping.length <= 0 || shipping.length > 255) return ['Length must be between 0 and 255'];
        if (shipping.width <= 0 || shipping.width > 255) return ['Width must be between 0 and 255'];

        if (sender) {
            if (sender.originAddress) {
                if (!sender.originAddress.postalCode) return ['The sender postal code must have a value'];
                if (!sender.originAddress.provinceCode) return ['The sender province must have a value'];
                if (!provinceCodePattern.test(sender.originAddress.provinceCode)) return ['The sender province must be a single uppercase letter (A-Z)'];
            }
        }

        return [undefined, new ImportShippingDto(
            customerId,
            extOrderId,
            orderNumber,
            recipient,
            shipping,
            sender,
        )];

    }

}
