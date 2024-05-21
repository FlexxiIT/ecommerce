import { Product } from "./product";
import { SubCategory } from "./subcategory";

export interface Category {
    id:string,
    name: string,
    subCategories: SubCategory[],
    products:Product[]
}