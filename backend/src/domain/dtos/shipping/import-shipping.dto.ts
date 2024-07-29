

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
    deliveredType: string,
    agency?: string,
    address: Address,
    weight: number,
    declaredValue: number,
    height: number,
    length: number,
    width: number

}

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
