import { isUUID } from "../../../config";




export class ChangeProductAvailabilityDto {

    private constructor(
        public readonly productId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ChangeProductAvailabilityDto?] {

        const { productId } = object;

        if (!productId) return ['Missing productId'];
        if (!isUUID(productId)) return ['Category id is not a valid id'];

        return [undefined, new ChangeProductAvailabilityDto(productId)];

    }


}