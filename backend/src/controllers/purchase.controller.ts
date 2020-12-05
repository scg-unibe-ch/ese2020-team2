import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';
import { PurchaseService } from '../services/purchase.service';

/**
 * This controller is to add, delete and update the purchases to the purchase model.
 * It also returns the purchases with variuos required conditions to the frontend.
 */
const purchaseController: Router = express.Router();
purchaseController.use(express.json());
const purchaseService = new PurchaseService();

/**
 * Creates a new purchase in the purchase model only if the user has more wallet points
 * than the price of the product multiplied by the quantity purchased.
 */
purchaseController.post('/addCart/',
    async (req: Request, res: Response) => {
        for (let eachProduct = 0; eachProduct < req.body.length; eachProduct++) {
            const currentProduct = req.body[eachProduct];
            const quantity = currentProduct.quantity;
            const product = await Product.findOne({ where: { productId: currentProduct.productId } });
            const buyer = await User.findOne({ where: { userId: currentProduct.buyerUserId } });
            const seller = await User.findOne({ where: { userId: currentProduct.sellerUserId } });
            if (product.sellOrLend === 'sell') {
                currentProduct.isSold = true;
            } else {
                currentProduct.isSold = false;
            }

            // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
            if (buyer && seller && product && buyer.moneyInWallet >= product.price * quantity &&
                buyer.userId !== product.userId && seller.userId === product.userId) {
                if (!(product.piecesAvailable <= 0) && product.piecesAvailable >= quantity && quantity > 0) {
                    // Create a new purchase.
                    const { purchaseId } = await Purchase.create(currentProduct);
                    if (purchaseId === undefined) {
                        res.status(500).send('Purchase failed! Try again. \nFailed when adding product ' + product.title);
                    } else {
                        await purchaseService.updateUserWallets(currentProduct, res);
                        await purchaseService.updateProductStatus(currentProduct, res);
                    }
                } else {
                    if (quantity <= 0) {
                        res.status(500).send('Select a valid quantity. \nFailed when adding product ' + product.title);
                    }
                    res.status(500).send('The product has only ' + product.piecesAvailable + ' pieces available.'
                        + '\nFailed when adding product ' + product.title);
                }
            } else {
                if (buyer.userId === product.userId) {
                    res.status(500).send('Seller cannot buy his own product. \nFailed when adding product ' + product.title);
                } else if (seller.userId !== product.userId) {
                    res.status(500).send('The seller is not the owner of the product. \nFailed when adding product ' + product.title);
                } else {
                    res.status(500).send('Buyer does not have enough money. Update wallet before purchase.'
                        + '\nFailed when adding product ' + product.title);
                }
            }
        }
        res.status(200).send('Purchase successful');
    });


/**
* Creates a new purchase in the purchase model only if the
* user has more wallet points than the price of the product multiplied by the quantity purchased.
*/
purchaseController.post('/add/',
    async (req: Request, res: Response) => {
        const { quantity } = req.body;
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const buyer = await User.findOne({ where: { userId: req.body.buyerUserId } });
        const seller = await User.findOne({ where: { userId: req.body.sellerUserId } });
        if (product.sellOrLend === 'sell') {
            req.body.isSold = true;
        } else {
            req.body.isSold = false;
        }

        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
        if (buyer && seller && product && buyer.moneyInWallet >= product.price * quantity &&
            buyer.userId !== product.userId && seller.userId === product.userId) {
            if (product.piecesAvailable >= quantity && quantity > 0) {
                // Create a new purchase.
                const { purchaseId } = await Purchase.create(req.body);
                if (purchaseId === undefined) {
                    res.status(500).send('Purchase failed! Try again');
                } else {
                    await purchaseService.updateUserWallets(req.body, res);
                    await purchaseService.updateProductStatus(req.body, res);
                    res.json({ purchaseId });
                }
            } else {
                if (quantity <= 0) {
                    res.status(500).send('Select a valid quantity');
                }
                res.status(500).send('The product has only ' + product.piecesAvailable + ' pieces available.');
            }
        } else {
            if (buyer.userId === product.userId) {
                res.status(500).send('Seller cannot buy his own product.');
            } else if (seller.userId !== product.userId) {
                res.status(500).send('The seller is not the owner of the product. \nFailed when adding product ' + product.title);
            } else {
                res.status(500).send('Buyer does not have enough money. Update wallet before purchase.');
            }
        }
    });

/**
 * Returns all bought products of a user(buyer) linked with the product and the user details.
 */
purchaseController.get('/getAllBuyerPurchases/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({ where: { buyerUserId: req.params.id }, include: [Purchase.associations.user, Purchase.associations.product] })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * Returns all the products that are both sold and lend by a user(seller) linked with the product and the user details.
 */
purchaseController.get('/getAllSellerSold/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({ where: { sellerUserId: req.params.id }, include: [Purchase.associations.user, Purchase.associations.product] })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * Returns all the products that are only sold by a user(seller) linked with the product and the user details.
 */
purchaseController.get('/getAllSellerSoldProducts/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({
            where: { sellerUserId: req.params.id, isSold: true },
            include: [Purchase.associations.user, Purchase.associations.product]
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
* Returns all the products that are only lend by a user(seller) linked with the product and the user details.
*/
purchaseController.get('/getAllSellerLendServices/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({
            where: { sellerUserId: req.params.id, isSold: false },
            include: [Purchase.associations.user, Purchase.associations.product]
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * Edits the user purchase details.
 */

purchaseController.put('/edit/:id', (req: Request, res: Response) => {
    Purchase.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Purchase updated successfully.');
                });
            } else {
                res.status(404).send('No such purchase found');
            }
        })
        .catch(err => res.status(500).send(err));
});

export const PurchaseController: Router = purchaseController;
