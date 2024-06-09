import { isUUID } from "../../../config";



export class ModifyOrderDto {
    constructor(
        public readonly clientId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ModifyOrderDto?] {
        const { clientId } = object;

        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['Invalid clientId'];

        return [undefined, new ModifyOrderDto(clientId)];
    }
}