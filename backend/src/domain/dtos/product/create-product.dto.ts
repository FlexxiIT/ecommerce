




export class CreateProductDto {

    private constructor(
        public readonly categoryId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly lowStockLimit: number,
        public readonly available?: boolean,
        public readonly stock?: number,
        public readonly discount?: number,
        public readonly image?: string,
    ) { }


    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const { categoryId, available, name, description, price, stock = 0, discount = 0, image = "", lowStockLimit } = object;
    
        if (!name) return ['Missing name'];
        if (!categoryId) return ['Missing category Id'];
        if (!description) return ['Missing description'];
    
        const parsedPrice = parseFloat(price);
        const parsedStock = parseFloat(stock);
        const parsedDiscount = parseFloat(discount);
        const parsedLowStockLimit = parseFloat(lowStockLimit);
    
        if (isNaN(parsedPrice)) return ['Price must be a valid number'];
        if (isNaN(parsedStock) || parsedStock < 0) return ['Stock must be a positive number'];
        if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) return ['Discount must be a number between 0 and 100'];
        if (isNaN(parsedLowStockLimit)) return ['Low stock limit must be a valid number'];
        
        return [undefined, new CreateProductDto(
            categoryId,
            name,
            description,
            parsedPrice,
            parsedLowStockLimit,
            !!available,
            parsedStock,
            parsedDiscount,
            image,
        )];
    }

}