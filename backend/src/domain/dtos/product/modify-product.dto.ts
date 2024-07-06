import { isUUID } from "../../../config";




export class ModifyProductDto {

    private constructor(
        public readonly productId: string,
        public readonly categoryId?: string,
        public readonly subCategoryId?: string,
        public readonly name?: string,
        public readonly description?: string,
        public readonly price?: number,
        public readonly lowStockLimit?: number,
        public readonly available?: boolean,
        public readonly stock?: number,
        public readonly discount?: number,
        public readonly timesSold?: number,
    ) { }


    static create(object: { [key: string]: any }): [string?, ModifyProductDto?] {
        const { productId, categoryId, subCategoryId, available, name, description, price, stock, discount, lowStockLimit, timesSold } = object;

        if (!productId) return ['Missing product Id'];
        if(!isUUID(productId)) return ['Product id is not a valid id'];
        
        const parsedPrice = price !== undefined ? parseFloat(price) : undefined;
        const parsedStock = stock !== undefined ? parseFloat(stock) : undefined;
        const parsedDiscount = discount !== undefined ? parseFloat(discount) : undefined;
        const parsedLowStockLimit = lowStockLimit !== undefined ? parseFloat(lowStockLimit) : undefined;
        const parsedTimesSold = timesSold !== undefined ? parseFloat(timesSold) : undefined;

        if (price !== undefined && isNaN(parsedPrice!)) return ['Price must be a valid number'];
        if (stock !== undefined && (isNaN(parsedStock!) || parsedStock! < 0)) return ['Stock must be a positive number'];
        if (discount !== undefined && (isNaN(parsedDiscount!) || parsedDiscount! < 0 || parsedDiscount! > 100)) return ['Discount must be a number between 0 and 100'];
        if (lowStockLimit !== undefined && isNaN(parsedLowStockLimit!)) return ['Low stock limit must be a valid number'];
        if (timesSold !== undefined && (isNaN(parsedTimesSold!) || parsedTimesSold! < 0)) return ['Times sold must be a valid positive number'];


        return [undefined, new ModifyProductDto(
            productId,
            categoryId,
            subCategoryId,
            name,
            description,
            parsedPrice,
            parsedLowStockLimit,
            !!available,
            parsedStock,
            parsedDiscount,
            timesSold,
        )];
    }

}