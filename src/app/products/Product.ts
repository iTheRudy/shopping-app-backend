import {ProductCategory} from "./ProductConstants";

export class Product {


    constructor() {
    }

    productId!: string;
    productName!: string;
    productPrice!: number;
    productImage!: string;
    productCategory!: ProductCategory
    createdTime!: string;
    lastUpdatedTime!: string;



}
