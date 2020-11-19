import express, {Request, Response, Router} from 'express';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Cart } from '../models/shoppingCart.model';
import {Review} from '../models/review.model';
import {ShoppingCart} from '../../../frontend/src/app/models/shoppingCart.model';

const shoppingCartController: Router = express.Router();
shoppingCartController.use(express.json());

// Add a way to sum together the same products about quantity

/**
 * Adds a new product in the shopping cart list
 */
shoppingCartController.post('/add',
    async (req: Request, res: Response) => {
        const quantity = req.body.quantity;
        // const { actualProduct } = req.body;
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        // const prodQuantity = await Product.findOne({ where: { productId: req.body.piecesAvailable } });
        const buyer = await User.findOne({ where: { userId: req.body.buyerUserId } });
        const seller = await User.findOne({ where: { userId: req.body.sellerUserId } });
        const shoppingCart = await Cart.findAll({ where: { userId: req.body.userId } });
        const b = shoppingCart.map((a => a.productId));
        if (!b.includes(100)) {
            res.status(500).send('You cannot add a product twice.');
        }

        if (false && buyer && seller && product && buyer.userId !== product.userId) {
            if (product.piecesAvailable >= quantity && quantity > 0) {
                // Adds a new product in the shopping cart.
                const { cartId } = await Cart.create(req.body);
                if (cartId === undefined) {
                    res.status(500).send('Adding product failed! Try again');
                } else {
                    res.json({ cartId });
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
            }
        }
    });




/**
 *  Deletes a product from the shopping cart list.
 */
shoppingCartController.delete('/delete/:userId/:productId', (req: Request, res: Response) => {
    Cart.findOne({where: { userId: req.params.userId, productId: req.params.productId }})
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send('Product deleted from shopping cart'));
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => res.status(500).send(err));
});

/**
 * Get one specific product from the shopping cart.
 */
shoppingCartController.get('/getProduct/:id', (req: Request, res: Response) => {
    Cart.findByPk(req.params.id)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * This method is to edit a product in the shopping cart.
 */
shoppingCartController.put('/edit/:userId/:productId', (req: Request, res: Response) => {
    Cart.findOne({where: { userId: req.params.userId, productId: req.params.productId }, include: [Cart.associations.product]})
        .then(found => {
            if (found != null) {
                found.update(req.body).then(() => {
                    res.status(200).send('Product in shopping Cart updated successfully.');
                });
            } else {
                res.status(404).send('No such product in the shopping cart.');
            }
        })
        .catch(err => res.status(500).send(err));
});

export const CartController: Router = shoppingCartController;
