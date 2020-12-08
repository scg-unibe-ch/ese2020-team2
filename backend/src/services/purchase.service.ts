import { Response } from 'express';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';

interface SingleProduct {
    productId: number;
    quantity: number;
    buyerUserId: number;
    sellerUserId: number;
    deliveryAddress: string;
}
export class PurchaseService {
    /**
    * This function updates the user wallets with (product price * quantity of purchase).
    * The wallet of the buyer os decremented and the wallet of the seller is incremented.
    */
    public async updateUserWallets(req: SingleProduct, res: Response) {
        const quantity = req.quantity;
        const product = await Product.findOne({ where: { productId: req.productId } });
        const buyer = await User.findOne({ where: { userId: req.buyerUserId } });
        const seller = await User.findOne({ where: { userId: req.sellerUserId } });
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
    public async updateProductStatus(req: SingleProduct, res: Response) {
        const product = await Product.findOne({ where: { productId: req.productId } });
        const availableProducts = product.piecesAvailable - req.quantity;
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
        await Product.findByPk(req.productId)
            .then(found => {
                if (found != null) {
                    found.update({ piecesAvailable: availableProducts, status: availabilityStatus });
                }
            })
            .catch(err => res.status(500).send(err));
    }
}
