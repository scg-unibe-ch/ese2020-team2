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
 * Adds a new review  and gives the data if successful or returns 500 error.
 */
reviewController.post('/add/', async(req: Request, res: Response) => {
    const review = await Review.findOne({ where: { productId: req.body.productId, buyerUserId: req.body.buyerUserId } });
    if (review === null) {
        const { reviewId } =  await Review.create(req.body);
        if (reviewId === undefined) {
            res.status(500).send('Failed to add review');
        } else {
            await updateProductRating(req, res);
            res.json({ reviewId });
        }
    } else {
        if (review != null) {
            res.status(500).send('The user had already reviewed this product.');
        } else {
            res.status(500).send('Failed to add review');
        }
    }
});

/**
 * Edits a review given by the user. IF successful returns 200 or gives 500 error.
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
 * Gets all the reviews of a particular product.
 */
reviewController.get('/getReview/:id', (req: Request, res: Response) => {
    Review.findByPk(req.params.id, { include: [Review.associations.product] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * Gets all the reviews of a particular user as buyer for different product.
 */
reviewController.get('/getBuyerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { buyerUserId: req.params.id } })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * Gets all the reviews of a particular user as seller for different product.
 */
reviewController.get('/getSellerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { sellerUserId: req.params.id }, include: [Review.associations.user] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * Get all the reviews of a particular product.
 */
reviewController.get('/getProductReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { productId: req.params.id }, include: [Review.associations.product] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * Get all the reviews of a particular product.
 */
reviewController.get('/getSellerReviews/:id', (req: Request, res: Response) => {
    Review.findAll({ where: { productId: req.params.id }, include: [Review.associations.user] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 *  Deletes a review.
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
/**
 * Edits a notificationCheck to Ture, if the user has viewed the notification.
 */
reviewController.put('/NotificationViewed/:id', (req: Request, res: Response) => {
    Review.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update({ notificationCheck: true, where: { sellerUserId: req.body.sellerUserId, reviewId: req.params.id } })
                .then(() => {
                    res.status(200).send('Notification status changed');
                });
            } else {
                res.status(404).send('Review not found.');
            }
        })
        .catch(err => res.status(500).send(err));
});

// Updates the average product rating.
async function updateProductRating(req: Request, res: Response) {
    const ratings = await Review.findAll({ where: { productId: req.body.productId } });
    if (ratings) {
        const productRating = (await Review.sum('rating')) / (ratings.length);
        await Product.findByPk(req.body.productId)
            .then(found => {
                if (found != null) {
                    found.update({ productRating: productRating })
                        .catch(err => res.status(500).send(err));
                }
            });
    }
}
export const ReviewController: Router = reviewController;
