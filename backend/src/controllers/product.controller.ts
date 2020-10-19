import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import {Product} from '../models/product.model';

const productController: Router = express.Router();
const productService = new ProductService();

/**
 * This method is to add new products/services to the products model. This calls the 'addProduct'
 * method from the ProductService.
 */

productController.post('/addProduct',
(req: Request, res: Response) => {
    productService.addProduct(req.body)
        .then(product_added => res.send(product_added))
        .catch(err => res.status(500).send(err));
});

/**
 * This Method enables to delete a product from the list of lend or sell products.
 *
 * @param product
 */

productController.delete('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send('Product removed success'));
            } else {
                res.sendStatus(404).send('cannot delete the product');
            }
        })
        .catch(err => res.status(500).send('cannot find the product'));
});

export const ProductController: Router = productController;
