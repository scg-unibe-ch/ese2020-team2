import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';
import { PurchaseService } from '../services/purchase.service';

/**
 * This controller is to add the purchase to the purchase model.
 */
const purchaseController: Router = express.Router();
purchaseController.use(express.json());
const purchaseService = new PurchaseService();

/**
 * This method creates a new purchase in the purchase model only if the
 * user has more wallet points than the price of the product multiplied by the quantity purchased.
 */
purchaseController.post('/add/',
    async (req: Request, res: Response) => {
        const { quantity } = req.body;
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const buyer = await User.findOne({ where: { userId: req.body.buyerUserId } });
        const seller = await User.findOne({ where: { userId: req.body.sellerUserId } });

        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
        if (buyer && seller && product && buyer.moneyInWallet >= product.price * quantity && buyer.userId !== product.userId) {
            if (product.piecesAvailable >= quantity && quantity > 0) {
                // Create a new purchase.
                const { purchaseId } = await Purchase.create(req.body);
                if (purchaseId === undefined) {
                    res.status(500).send('Purchase failed! Try again');
                } else {
                    await purchaseService.updateUserWallets(req, res);
                    await purchaseService.updateProductStatus(req, res);
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
            } else {
                res.status(500).send('Buyer does not have enough money. Update wallet before purchase.');
            }
        }
    });

/**
 * This method if called outputs all bought products of a precise user (buyer)
 */
purchaseController.get('/getAllBuyerPurchases/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({ where: { buyerUserId: req.params.id } })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * This method if called outputs all sold products of a precise user (seller)
 */
purchaseController.get('/getAllSellerSold/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({ where: { sellerUserId: req.params.id }, include: [Purchase.associations.user, Purchase.associations.product] })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

/**
 * This method is to edit a purchase.
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
