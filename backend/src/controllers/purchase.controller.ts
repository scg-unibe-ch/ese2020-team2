import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import { Router, Request, Response, RequestHandler } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';
import { Readable } from 'stream';

/*This controller is to add the purchase to the purchase model.*/
const purchaseController: Router = express.Router();
purchaseController.use(express.json());

/*This method creates a new purchase in the purchase model
if, the user has more wallet points that the price of the product and the quantity purchased.*/
purchaseController.post('/add/',
    async (req: Request, res: Response) => {
        const {
            userId,
            productId,
            quantity,
        } = req.body;

        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const user = await User.findOne({ where: { userId: req.body.buyingUserId } });
        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
        if (user && product && user.moneyInWallet >= product.price * quantity) {
            const { purchaseId } = await Purchase.create(req.body);
            if (purchaseId === undefined) {
                res.status(500); // or some other bad code
                res.send('Purchase failed! Try again');
            } else {
                // Following code is to decrement the walletpoints in buyer wallet.
                let walletPoints = (user.moneyInWallet) - (product.price * quantity);
                User.findByPk(req.body.buyingUserId)
                    .then(found => {
                        if (found != null) {
                            found.update({ moneyInWallet: walletPoints });
                        }
                    })
                    .catch(err => res.status(500).send(err));
                // Following code is to increment the walletpoints in seller wallet.
                const seller = await User.findOne({ where: { userName: product.userName } });
                walletPoints = seller.moneyInWallet + walletPoints;
                User.findByPk(seller.userId)
                    .then(found => {
                        if (found != null) {
                            found.update({ moneyInWallet: walletPoints });
                        }
                    })
                    .catch(err => res.status(500).send(err));
                res.json({ purchaseId }
                );
            }
        } else {
            res.send('User donot have enough money');
        }
    });

export const PurchaseController: Router = purchaseController;
