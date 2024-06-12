import { isUUID } from "../../../config";



export class ShowCreateOrderDto {
    constructor(
        public readonly clientId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ShowCreateOrderDto?] {
        const { clientId } = object;

        if (!clientId) return ['Missing clientId'];
        if (!isUUID(clientId)) return ['Invalid clientId'];

        return [undefined, new ShowCreateOrderDto(clientId)];
    }
}