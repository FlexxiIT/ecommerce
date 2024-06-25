



export class CreateProductDto {

    private constructor(
        public readonly categoryId: string,
        public readonly subCategoryId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly lowStockLimit: number,
        public readonly available?: boolean,
        public readonly stock?: number,
        public readonly discount?: number,
        public readonly image?: string,
        public readonly timesSold?: number,
    ) { }


    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const { categoryId, subCategoryId, available, name, description, price, stock = 0, discount = 0, image = "", lowStockLimit = 0, timesSold = 0 } = object;

        if (!name) return ['Missing name'];
        if (!categoryId) return ['Missing category Id'];
        if (!subCategoryId) return ['Missing sub category Id'];
        if (!description) return ['Missing description'];

        const parsedPrice = parseFloat(price);
        const parsedStock = parseFloat(stock);
        const parsedDiscount = parseFloat(discount);
        const parsedLowStockLimit = parseFloat(lowStockLimit);
        const parsedTimesSold = parseFloat(timesSold);

        if (isNaN(parsedPrice)) return ['Price must be a valid number'];
        if (isNaN(parsedStock) || parsedStock < 0) return ['Stock must be a positive number'];
        if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) return ['Discount must be a number between 0 and 100'];
        if (isNaN(parsedLowStockLimit)) return ['Low stock limit must be a valid number'];
        if (isNaN(parsedTimesSold) || parsedTimesSold < 0) return ['Times sold must be a valid positive number'];

        return [undefined, new CreateProductDto(
            categoryId,
            subCategoryId,
            name,
            description,
            parsedPrice,
            parsedLowStockLimit,
            !!available,
            parsedStock,
            parsedDiscount,
            image,
            timesSold,
        )];
    }

}