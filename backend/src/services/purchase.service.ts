import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';

export class PurchaseService {
    /**
    * This function updates the user wallets with (product price * quantity of purchase).
    * The wallet of the buyer os decremented and the wallet of the seller is incremented.
    */
    public async updateUserWallets(req: Request, res: Response) {
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
    public async updateProductStatus(req: Request, res: Response) {
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
}
