import { Request, Response } from 'express';
import { productService } from './service';
import { ProductCategory } from './ProductConstants';

export const productController = {
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getProductById(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const product = await productService.getProductById(productId);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async createProduct(req: Request, res: Response) {
        try {
            const { productName, productPrice, productImage, productCategory } = req.body;
            if (!productName || !productPrice || !productCategory) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            // productC.createdTime = Date.now().toString();
            // userData.lastUpdatedTime = Date.now().toString();
            const createdProduct = await productService.createProduct({
                productName,
                productPrice,
                productImage,
                productCategory: productCategory as ProductCategory, // Convert string to enum
            });
            res.status(201).json(createdProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async updateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const updatedProductData = req.body;
            const updatedProduct = await productService.updateProduct(productId, updatedProductData);
            if (updatedProduct) {
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async deleteProduct(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            await productService.deleteProduct(productId);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
