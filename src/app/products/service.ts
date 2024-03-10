import {Product} from "./Product";

export const productsService = {
    async createUser(productData: Product): Promise<Product> {
        // Logic to create user
        return {
            productName: productData.productName,
            productId: productData.productId,
            // Populate other user properties as needed
        };
    }
};
