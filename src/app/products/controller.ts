import { Request, Response } from 'express';
import {productsService} from './service'

const productController = {
    async getAllProducts(req: Request, res: Response) {
        try {
            const newUser = await productsService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            // @ts-ignore
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }
};

export default productController;
