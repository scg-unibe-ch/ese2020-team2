import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

/*This method is to add new products/services to the products model. This calls the 'addProduct' method from the ProductService.*/
productController.post('/addProduct',
(req: Request, res: Response) => {
    productService.addProduct(req.body).then(product_added => res.send(product_added)).catch(err => res.status(500).send(err));
});

export const ProductController: Router = productController;
