import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';

/**
 * This controller is to add the purchase to the purchase model.
 */

const purchaseController: Router = express.Router();
purchaseController.use(express.json());

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
                    await updateUserWallets(req, res);
                    await updateProductStatus(req, res);
                    res.json({ purchaseId });
                }
            } else {
                if (quantity <= 0) {
                    res.status(500).send('Select a valid quantitiy');
                }
                res.status(500).send('The product has only ' + product.piecesAvailable + ' pieces available.');
            }
        } else {
            if (buyer.userId === product.userId) {
                res.status(500).send('Seller cannot buy his own product.');
            } else {
                res.status(500).send('Buyer doesnot have enough money. Update wallet before purchase.');
            }
        }
    });

/**
 * This function updates the user wallets with (product price * quantity of purchase).
 * The wallet of the buyer os decremented and the wallet of the seller is incremented.
 */

async function updateUserWallets(req: Request, res: Response) {
    const { quantity } = req.body;
    const product = await Product.findOne({ where: { productId: req.body.productId } });
    const buyer = await User.findOne({ where: { userId: req.body.buyerUserId } });
    const seller = await User.findOne({ where: { userId: req.body.sellerUserId } });
    // Decrement the wallet points in buyer wallet.
    await User.findByPk(buyer.userId)
        .then(found => {
            if (found != null) {
                found.decrement(['moneyInWallet'], { by: product.price * quantity }).catch(err => res.status(500).send(err));
            }
        });
    // Increment the wallet points in seller wallet.
    await User.findByPk(seller.userId)
        .then(found => {
            if (found != null) {
                found.increment(['moneyInWallet'], { by: product.price * quantity }).catch(err => res.status(500).send(err));
            }
        });
}
/**
 * This function updates the number of pieces of the product available after a purchase is made.
 * It decrements the number of pieces available with the quantity of purchase.
 */
async function updateProductStatus(req: Request, res: Response) {
    const product = await Product.findOne({ where: { productId: req.body.productId } });
    const availableProducts = product.piecesAvailable - req.body.quantity;
    let availabilityStatus = '';
    // Manages the Status of the product or service
    if (availableProducts > 0) {
        availabilityStatus = 'available';
    } else if (availableProducts === 0 && product.type === 'product') {
        availabilityStatus = 'sold';
    } else if (availableProducts === 0 && product.type === 'service') {
        availabilityStatus = 'lent';
    }
    // The Product quantity and its status are updated
    Product.findByPk(req.body.productId)
        .then(found => {
            if (found != null) {
                found.update({ piecesAvailable: availableProducts, status: availabilityStatus });
            }
        })
        .catch(err => res.status(500).send(err));
}

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
        Purchase.findAll({ where: { sellerUserId: req.params.id } })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

export const PurchaseController: Router = purchaseController;
