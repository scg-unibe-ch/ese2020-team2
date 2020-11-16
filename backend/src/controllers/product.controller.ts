import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

const productController: Router = express.Router();

/**
 * This method is to add new products/services to the user product list.
 */
productController.post('/add', (req: Request, res: Response) => {
        Product.create(req.body).then(product_added => res.send(product_added)).catch(err => res.status(500).send(err));
    });

/**
 * This Method enables to delete a product by setting its status to deleted.
 */
productController.delete('/delete/:id', async (req: Request, res: Response) => {
    // Setting all product attribute to null or 0 to hide user information
    const productStatus = 'deleted';
    // deletes the product information
    Product.findByPk(req.params.id).then(found => {
            if (found != null) {
                 if (found.userId !== 0) {
                    found.update({
                        status: productStatus
                    }).then(() => res.status(200).send('Product is removed successfully.'));
               } else {
                   res.status(500).send('Product already deleted');
               }
             } else {
                res.status(404).send('Product not found.');
             }

    }).catch(err => res.status(500).send(err));
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
                res.status(404).send('Product not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});


/**
 * This method is to get the list of all products in the products model.
 */
productController.get('/getAll',
    (req: Request, res: Response) => {
        Product.findAll({include: [Product.associations.user]})
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * This method is to get a specific product from the products model.
 */
productController.get('/get/:id',
    (req: Request, res: Response) => {
        Product.findByPk(req.params.id )
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

/**
 * This method is to add new reviews in the  products model.
 * Each time a new review is added, it will be added to the existing Array of reviews.
 */
// productController.put('/addNewReview/:id', (req: Request, res: Response) => {
//     Product.findByPk(req.params.id)
//         .then(found => {
//             if (found != null) {
//                 found.update({
//                     sellerReview: found.sellerReview.concat(req.body.sellerReview)
//                 }, { where: { productId: req.params.id } })
//                     .then(() => {
//                         res.status(200).send('Review added successfully.');
//                     })
//                     .catch(err => res.status(500).send(err));
//             } else {
//                 res.status(404).send('Product not found.');
//             }
//         })
//         .catch(err => res.status(500).send(err));
// });
export const ProductController: Router = productController;
