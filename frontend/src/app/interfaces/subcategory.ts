import { Product } from "./product";

export interface SubCategory {
    id:string,
    categoryId: string,
    name: string,
    subCategories: SubCategory[],
    products:Product[]
}