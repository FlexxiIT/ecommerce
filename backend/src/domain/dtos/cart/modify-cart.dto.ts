import { isUUID } from "../../../config";

export enum CartOperation {
    UPDATE = "UPDATE",
    REMOVE = "REMOVE"
}

export class ModifyCartDto {
    private constructor(
        public readonly clientId: string,
        public readonly operation: CartOperation,
        public readonly productId: string,
        public readonly quantity?: number,
    ) { }

    static create(object: { [key: string]: any }): [string?, ModifyCartDto?] {
        const { clientId, operation, productId, quantity = "0" } = object;

        if (!clientId || !isUUID(clientId)) return ['Invalid or missing clientId'];
        if (!operation || !Object.values(CartOperation).includes(operation)) return ['Invalid operation'];
        if (!productId || !isUUID(productId)) return ['Invalid or missing productId'];

        const parsedQuantity = parseFloat(quantity);
        if (isNaN(parsedQuantity) && operation !== CartOperation.REMOVE) return ['Quantity must be a valid number'];
        if (parsedQuantity <= 0 && operation !== CartOperation.REMOVE) return ['Quantity must be higher than 0'];


        return [undefined, new ModifyCartDto(clientId, operation, productId, parsedQuantity)];
    }
}