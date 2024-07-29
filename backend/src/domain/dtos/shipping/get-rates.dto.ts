
export interface Dimensions {
    weight: number
    height: number
    width: number
    length: number
}

export class GetRatesDto {

    constructor(
        public readonly customerId: string,
        public readonly postalCodeOrigin: string,
        public readonly postalCodeDestination: string,
        public readonly dimensions: Dimensions,
        public readonly deliveredType?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, GetRatesDto?] {

        const {customerId, postalCodeOrigin, postalCodeDestination, dimensions, deliveredType} = object;

        if(!customerId) return ['Missing customer id'];
        if(!postalCodeOrigin) return ['Missing postal code origin'];
        if(!postalCodeDestination) return ['Missing postal code destination'];
        if(!dimensions) return ['Missing dimesions'];
        if(!dimensions.weight || dimensions.weight < 1 || dimensions.weight > 25000) return ['Missing or invalid dimension weight'];
        if(!dimensions.height || dimensions.height > 150) return ['Missing or invalid dimesions height'];
        if(!dimensions.width || dimensions.width > 150) return ['Missing or invalid dimesions width'];
        if(!dimensions.length || dimensions.length > 150) return ['Missing or invalid dimesions length'];
        if(deliveredType) {
            if(deliveredType !== 'D' || deliveredType !== 'S') return ['Invalid delivered type'];
        }

        return [undefined, new GetRatesDto(
            customerId,
            postalCodeOrigin,
            postalCodeDestination,
            dimensions,
            deliveredType,
        )];

    }
    
}
