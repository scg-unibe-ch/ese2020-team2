import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

/**
 * The responsibility of this class is to handle the product creating, deletion and updating.
 * It also returns the list of product requires for the catalog.
 */

const productController: Router = express.Router();

/**
 * Adds new products/services to the user product list.
 */
productController.post('/add', (req: Request, res: Response) => {
    Product.create(req.body).then(product_added => res.send(product_added)).catch(err => res.status(500).send(err));
});

/**
 * Deletes a product by setting its status to deleted.
 */
productController.delete('/delete/:id', async (req: Request, res: Response) => {
    req.body.status = 'deleted';
    Product.findByPk(req.params.id).then(found => {
        if (found != null) {
            if (found.status !== 'deleted') {
                found.update(
                   req.body
                ).then(() => res.status(200).send('Product removed successfully.'));
            } else {
                res.status(500).send('Product already deleted');
            }
        } else {
            res.status(404).send('Product not found.');
        }

    }).catch(err => res.status(500).send(err));
});

/**
 * Edits a product in the products model.
 */
productController.put('/edit/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Product updated successfully.');
                });
            } else {
                res.status(404).send('Product not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});


/**
 * Returns the list of all products in the products model.
 */
productController.get('/getAll',
    (req: Request, res: Response) => {
        Product.findAll({ include: [Product.associations.user] })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * Returns a specific product from the products model.
 */
productController.get('/get/:id',
    (req: Request, res: Response) => {
        Product.findByPk(req.params.id)
            .then(found => {
                if (found != null) {
                    Product.findOne({
                        where: { productId: req.params.id }, include: [Product.associations.user]
                    })
                        .then(product => res.status(200).send(product))
                        .catch(err => res.status(500).send(err));
                } else {
                    res.status(404).send('Product not found.');
                }
            })
            .catch(err => res.status(500).send(err));
    });

export const ProductController: Router = productController;
