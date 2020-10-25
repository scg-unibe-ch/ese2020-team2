import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import { Router, Request, Response, RequestHandler } from 'express';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { User } from '../models/user.model';
import { Readable } from 'stream';
import { and } from 'sequelize/types';

const purchaseController: Router = express.Router();
// purchaseController.use(bodyParser.json);
// purchaseController.use(express.json);

purchaseController.post('/add/',
    async (req: Request, res: Response) => {

        // const product = await Product.findOne({ where: { productId: req.body.productId }, attributes: ['price'] });
        // const user = await User.findOne({ where: { userId: req.body.buyingUserId }, attributes: ['moneyInWallet'] });
        // if (user && product && user.moneyInWallet >= product.price) {
           await Purchase.create(req.body)
                .then(purchase_added => res.send(purchase_added))
                .catch(err => res.status(500).send('not added'));
        // } else {
        //     res.status(404).send('Wallet points not enough to buy.');
        // }
    });



export const PurchaseController: Router = purchaseController;
