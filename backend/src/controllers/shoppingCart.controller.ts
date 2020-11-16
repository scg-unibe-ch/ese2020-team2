import express, {Request, Response, Router} from 'express';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Cart } from '../models/shoppingCart.model';

const shoppingCartController: Router = express.Router();

/**
 * Adds a new product in the shopping cart list
 */
shoppingCartController.post('/add',
    async (req: Request, res: Response) => {
        const { quantity } = req.body;
        const product = await Product.findOne({ where: { productId: req.body.productId } });
        const buyer = await User.findOne({ where: { userId: req.body.buyerUserId } });
        const seller = await User.findOne({ where: { userId: req.body.sellerUserId } });

        // This condition is to allow purchase only if the buyer has enough wallet points to buy the product.
        if (buyer && seller && product && buyer.userId !== product.userId) {
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
 * Get all the products of the shopping cart.
 */
shoppingCartController.get('/getAll', (req: Request, res: Response) => {
        Cart.findAll({include: [Cart.associations.user]})
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
});

/**
 *  Deletes a product from the shopping cart list.
 */
shoppingCartController.delete('/delete/:id', (req: Request, res: Response) => {
    Cart.findByPk(req.params.id)
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
shoppingCartController.put('/edit/:id', (req: Request, res: Response) => {
    Cart.findByPk(req.params.id)
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
