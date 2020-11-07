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
        const { quantity }  = req.body;
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const user = await User.findOne({ where: { userId: req.body.buyerUserId } });

        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.

        if (user && product && user.moneyInWallet >= product.price * quantity) {
            if (product.piecesAvailable > 0) {
                if (product.piecesAvailable >= quantity && quantity > 0) {
                    const { purchaseId } = await Purchase.create(req.body);
                    if (purchaseId === undefined) {
                        res.status(500); // or some other bad code
                        res.send('Purchase failed! Try again');
                    } else {
                        await updateUserWallets(req, res);
                        await updateProductsAvailable(req, res);
                        // console.log({ purchaseId });
                        // res.json({ purchaseId });
                    }
                } else {
                    res.send('Product quantity exceeded (' + product.piecesAvailable  + ' available) ' +
                        'or the quantity entered is nonsense!\nPlease try again.');
                }
            } else {
                res.send('The product has run out of quantity!');
            }

        } else {
        res.send('The Buyer has run out of money!\nPlease check your wallet.');
        }
    });

    /**
     * This function updates the user wallets with (product price * quantity of purchase).
     * The wallet of the buyer os decremented and the wallet of the seller is incremented.
     */

    async function updateUserWallets (req: Request, res: Response) {
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const user = await User.findOne({ where: { userId: req.body.buyerUserId } });

        // Following code is to decrement the wallet points in buyer wallet.

        let walletPoints = (user.moneyInWallet) - (product.price * req.body.quantity);
        User.findByPk(req.body.buyerUserId)
            .then(found => {
                if (found != null) {
                    found.update({ moneyInWallet: walletPoints });
                }
            })
            .catch(err => res.status(500).send(err));

        // Following code is to increment the wallet points in seller wallet.

        const seller = await User.findOne({ where: { userName: product.userName } });
        walletPoints = seller.moneyInWallet + (product.price * req.body.quantity);
        User.findByPk(seller.userId)
            .then(found => {
                if (found != null) {
                    found.update({ moneyInWallet: walletPoints })
                         .then(walletsUpdated => res.send(walletsUpdated));
                }
            })
            .catch(err => res.status(500).send(err));
    }

    /**
     * This function updates the number of pieces of the product available after a purchase is made.
     * It decrements the number of pieces available with the quantity of purchase.
     */

    async function updateProductsAvailable (req: Request, res: Response) {
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const availableProducts = product.piecesAvailable - req.body.quantity;
        let availabilityStatus = '';

        // Manages the Status of the product or service

        if (availableProducts > 0 ) {
            availabilityStatus = 'available';
        } else if (availableProducts === 0 ) {
            if (product.type === 'product') {
                availabilityStatus = 'sold';
            }
            if (product.type === 'service') {
                availabilityStatus = 'lent';
            }
        }

        // Outputs the quantity of the product still available

        if (availableProducts > 0) {
            res.send('Only ' + availableProducts + ' pieces of this product are available.');
        }

        // The Product quantity and its status are updated

        Product.findByPk(req.body.productId)
            .then(found => {
                if (found != null) {
                    found.update({ piecesAvailable: availableProducts, status: availabilityStatus});
                }
            })
            .catch(err => res.status(500).send(err));
    }

/**
 * This method if called outputs all bought products of a precise user (buyer)
 */

    purchaseController.get('/getAllBuyerPurchases/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({where: {buyerUserId:  req.params.id}})
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
    });

/**
 * This method if called outputs all sold products of a precise user (seller)
 */

purchaseController.get('/getAllSellerSold/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({where: {sellerUserId:  req.params.id}})
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

export const PurchaseController: Router = purchaseController;
