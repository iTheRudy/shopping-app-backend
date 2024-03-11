import express from 'express';
import {productController} from "./controller";

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/create', productController.createProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;
