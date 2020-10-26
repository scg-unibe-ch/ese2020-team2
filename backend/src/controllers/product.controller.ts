import express from 'express';
<<<<<<< HEAD
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
=======
import { Router, Request, Response, RequestHandler } from 'express';
import { Product } from '../models/product.model';
import { Readable } from 'stream';
>>>>>>> 6db9ecac76c3d43155eb5f3c971e5e0d170d5640

const productController: Router = express.Router();

/**
 * This method is to add new products/services to the products model.
 */
productController.post('/add',
    (req: Request, res: Response) => {
        Product.create(req.body)
        .then(product_added => res.send(product_added))
        .catch(err => res.status(500).send(err));
    });

<<<<<<< HEAD
=======

>>>>>>> 6db9ecac76c3d43155eb5f3c971e5e0d170d5640
/**
 * This Method enables to delete a product from the list of lend or sell products.
 *
 * @param product
 */
productController.delete('/delete/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send('Product removed successfully.'));
            } else {
<<<<<<< HEAD
                res.sendStatus(404).send('Product not found.');
=======
                res.status(404).send('Product not found.');
>>>>>>> 6db9ecac76c3d43155eb5f3c971e5e0d170d5640
            }
        })
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to edit a product in the products model.
 */
productController.put('/edit/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Product updated successfully.');
                });
            } else {
<<<<<<< HEAD
                res.sendStatus(404).send('Product not found.');
=======
                res.status(404).send('Product not found.');
>>>>>>> 6db9ecac76c3d43155eb5f3c971e5e0d170d5640
            }
        })
        .catch(err => res.status(500).send(err));
    });


/**
 * This method is to get the list of all products in the products model.
 */
productController.get('/getAll',
    (req: Request, res: Response) => {
        Product.findAll()
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * This method is to get a specific product from the products model.
 */
productController.get('/get/:id',
    (req: Request, res: Response) => {
        Product.findByPk(req.params.id)
            .then(found => {
                if (found != null) {
                    Product.findOne({
                        where: { productId: req.params.id }
                    })
                        .then(product => res.status(200).send(product))
                        .catch(err => res.status(500).send(err));
                } else {
<<<<<<< HEAD
                    res.sendStatus(404).send('Product not found.');
=======
                    res.status(404).send('Product not found.');
>>>>>>> 6db9ecac76c3d43155eb5f3c971e5e0d170d5640
                }
            })
            .catch(err => res.status(500).send(err));
    });
export const ProductController: Router = productController;
