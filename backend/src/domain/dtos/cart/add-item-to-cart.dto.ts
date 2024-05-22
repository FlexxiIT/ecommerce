import { isUUID } from "../../../config";

export class AddToCartDto {
    private constructor(
        public readonly clientId: string,
        public readonly productId: string,
        public readonly quantity: number
    ) { }

    static create(object: { [key: string]: any }): [string?, AddToCartDto?] {
        const { clientId, productId, quantity = 0 } = object;

        if (!clientId || !isUUID(clientId)) return ['Invalid or missing clientId'];
        if (!productId || !isUUID(productId)) return ['Invalid or missing productId'];

        const parsedQuantity = parseFloat(quantity);

        if (isNaN(parsedQuantity)) return ['Quantity must be a valid number'];

        return [undefined, new AddToCartDto(clientId, productId, parsedQuantity)];
    }
}