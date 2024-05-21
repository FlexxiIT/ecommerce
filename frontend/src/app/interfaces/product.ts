export interface Product {
     id: string,
     categoryId: string,
     subCategoryId: string,
     name: string,
     description: string,
     price: number,
     lowStockLimit: number,
     available?: boolean,
     stock?: number,
     discount?: number,
     image?: string,
     timesSold?: number,
}