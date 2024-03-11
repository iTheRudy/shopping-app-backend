// productService.ts

import {getDb} from "../../db";
import {Product} from "./Product";
// @ts-ignore
import {v4 as uuidv4} from "uuid"
import {ProductCategory} from "./ProductConstants";

export const productService = {
    async getAllProducts(): Promise<Product[]> {
        const db = getDb();
        const products = await db.collection('products').find().toArray();
        return products.map(mapDbProductToProduct);
    },

    async getProductById(productId: string): Promise<Product | null> {
        const db = getDb();
        const product = await db.collection('products').findOne({productId});
        return product ? mapDbProductToProduct(product) : null;
    },

    async createProduct(productData: Omit<Product, 'productId' | 'createdTime' | 'lastUpdatedTime'> & {
        productCategory: ProductCategory
    }): Promise<Product> {
        const db = getDb();
        const productId = uuidv4();
        const createdTime = new Date().toString();
        const lastUpdatedTime = new Date().toString();
        const product: Product = {productId, ...productData, createdTime, lastUpdatedTime};
        await db.collection('products').insertOne(mapProductToDbProduct(product));
        return product;
    },

    async updateProduct(productId: string, updatedProductData: Partial<Product>): Promise<Product | null> {
        const db = getDb();
        updatedProductData.lastUpdatedTime = new Date().toString();
        const result = await db.collection('products').findOneAndUpdate(
            {productId},
            // @ts-ignore
            {$set: mapProductToDbProduct(updatedProductData)},
            // @ts-ignore
            {returnOriginal: false}
        );
        return result.value ? mapDbProductToProduct(result.value) : null;
    },

    async deleteProduct(productId: string): Promise<void> {
        const db = getDb();
        await db.collection('products').deleteOne({productId});
        // await db.close();
    },
};

function mapDbProductToProduct(dbProduct: any): Product {
    return {
        productId: dbProduct.productId,
        productName: dbProduct.productName,
        productPrice: dbProduct.productPrice,
        productImage: dbProduct.productImage,
        productCategory: dbProduct.productCategory,
        createdTime: dbProduct.createdTime.toString(),
        lastUpdatedTime: dbProduct.lastUpdatedTime.toString(),
    };
}

function mapProductToDbProduct(product: Product): any {
    return {
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.productImage,
        productCategory: product.productCategory,
        createdTime: new Date(product.createdTime).toString(), // Convert date to timestamp
        lastUpdatedTime: new Date(product.lastUpdatedTime).toString(),
    };
}
