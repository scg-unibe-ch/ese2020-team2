import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';

/*This controller is to add the purchase to the purchase model.*/
const purchaseController: Router = express.Router();
purchaseController.use(express.json());

/*This method creates a new purchase in the purchase model only if the
user has more wallet points that the price of the product multiplied the quantity purchased.*/
purchaseController.post('/add/',
    async (req: Request, res: Response) => {
        const {
            quantity,
        } = req.body;

        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const user = await User.findOne({ where: { userId: req.body.buyerUserId } });
        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
        if (user && product && user.moneyInWallet >= product.price * quantity && product.piecesAvailable >= quantity) {
            const { purchaseId } = await Purchase.create(req.body);
            if (purchaseId === undefined) {
                res.status(500); // or some other bad code
                res.send('Purchase failed! Try again');
            } else {
                updateUserWallets(req, res);
                updateProductsAvailable(req, res);
                res.json({ purchaseId }
                );
            }
        } else {
            res.send('User donot have enough money');
        }
    });

    /*This function updates the user wallets with (product price * qnatity of purchase).
    The wallet of the buyer os decremented and the wallet of the seller is incremented.*/
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
                    found.update({ moneyInWallet: walletPoints }).then(walletsUpdated => res.send(walletsUpdated));
                }
            })
            .catch(err => res.status(500).send(err));
    }

    /*This function updates the number of pieces of the product available after a purchase is made.
    It decrements the number of pieces available with the quantity of purchase.*/
    async function updateProductsAvailable (req: Request, res: Response) {
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const availableProducts = product.piecesAvailable - req.body.quantity;

        let availabilityStatus = '';

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

        if (availableProducts > 0) {
            res.send('Only ' + availableProducts + ' pieces of this product are available.');
        }
        Product.findByPk(req.body.productId)
            .then(found => {
                if (found != null) {
                    found.update({ piecesAvailable: availableProducts, status: availabilityStatus});
                }
            })
            .catch(err => res.status(500).send(err));
    }


    purchaseController.get('/getAllBuyerPurchases/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({where: {buyerUserId:  req.params.id}})
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
    });

purchaseController.get('/getAllSellerSold/:id',
    (req: Request, res: Response) => {
        Purchase.findAll({where: {sellerUserId:  req.params.id}})
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

export const PurchaseController: Router = purchaseController;
