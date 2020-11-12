import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';
import { Review } from '../models/review.model';

/**
 * This controller is to add the reviews to the review model.
 */
const reviewController: Router = express.Router();
reviewController.use(express.json());

/**
 * This method is to add a new review.
 */
reviewController.post('/add/', async(req: Request, res: Response) => {
    const review = await Review.findOne({ where: { purchaseId: req.body.purchaseId } });
    if (review === null) {
    Review.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
    } else {
        if (review != null) {
        res.status(500).send('The user had already reviewed this product.');
        } else {
            res.status(500).send('Failed to add review');
        }
    }
});

/**
 * This method is to edit a review
 */
reviewController.put('/edit/:id', (req: Request, res: Response) => {
    Review.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Review updated successfully.');
                });
            } else {
                res.status(404).send('Review not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to get all the reviews of a particular product.
 */
reviewController.get('/getReview/:id', (req: Request, res: Response) => {
    Review.findByPk(req.params.id, { include: [Review.associations.product] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to get all the reviews of a particular user as buyer for different product.
 */
reviewController.get('/getBuyerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { buyerUserId: req.params.id }})
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to get all the reviews of a particular user as seller for different product.
 */
reviewController.get('/getSellerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { sellerUserId: req.params.id } , include: [Review.associations.user] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to get all the reviews of a particular product.
 */
reviewController.get('/getProductReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { productId: req.params.id } , include: [Review.associations.product] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to get all the reviews of a particular product.
 */
reviewController.get('/getSellerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { productId: req.params.id } , include: [Review.associations.user] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to delete a review.
 */
reviewController.delete('/delete/:id', (req: Request, res: Response) => {
    Review.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.status(404).send('Review not found');
            }
        })
        .catch(err => res.status(500).send(err));
});

export const ReviewController: Router = reviewController;
