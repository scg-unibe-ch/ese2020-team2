import express, {Request, Response, Router} from 'express';
import {Product} from '../models/product.model';
import {User} from '../models/user.model';
import {Cart} from '../models/shoppingCart.model';
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
        const product = await Product.findOne({where: {productId: req.body.productId}});
        // const prodQuantity = await Product.findOne({ where: { productId: req.body.piecesAvailable } });
        const buyer = await User.findOne({where: {userId: req.body.buyerUserId}});
        const seller = await User.findOne({where: {userId: req.body.sellerUserId}});
        const shoppingCart = await Cart.findAll({where: {userId: req.body.userId, shoppingCart: true}});
        const wishList = await Cart.findAll({where: {userId: req.body.userId, wishList: true}});
        const productIdsCart = await shoppingCart.map((value => value.productId));
        const productIdsWish = await wishList.map((value => value.productId));


        if (buyer && seller && product && buyer.userId !== product.userId && !productIdsCart.includes(req.body.productId) &&
            !productIdsWish.includes(req.body.productId)) {
            if (product.piecesAvailable >= quantity && quantity > 0) {
                // Adds a new product in the shopping cart.
                const {cartId} = await Cart.create(req.body);
                if (cartId === undefined) {
                    res.status(500).send('Adding product failed! Try again');
                } else {
                    res.json({cartId});
                }
            } else {
                if (quantity <= 0) {
                    res.status(500).send('Select a valid quantity');
                } else {
                    res.status(500).send('The product has only ' + product.piecesAvailable + ' pieces available.');
                }
            }
        } else {
            if (buyer.userId === product.userId) {
                res.status(500).send('Seller cannot buy his own product.');
            }
            if (productIdsWish.includes(req.body.productId) &&
                productIdsCart.includes(req.body.productId) && (req.body.shoppingCart === true || req.body.wishList === true)) {
                res.status(500).send('This product is already in the wish list and the shopping cart.');
            } else {
                if (productIdsWish.includes(req.body.productId) && req.body.wishList === true) {
                    res.status(500).send('You cannot add a product twice to the wish list.');
                }
                if (!productIdsWish.includes(req.body.productId) && req.body.wishList === true && req.body.shoppingCart === false) {
                    Cart.findOne({where: {userId: req.body.userId, productId: req.body.productId}})
                        .then(found => {
                            if (found != null) {
                                found.update({wishList: true});
                                res.status(200).send('Product successfully added to the wish list');
                            }
                        });
                }
                if (productIdsCart.includes(req.body.productId) && req.body.shoppingCart === true) {
                    res.status(500).send('You cannot add a product twice. You can change the quantity in the shopping cart');
                }
                if (!productIdsCart.includes(req.body.productId) && req.body.shoppingCart === true && req.body.wishList === false) {
                    Cart.findOne({where: {userId: req.body.userId, productId: req.body.productId}})
                        .then(found => {
                            if (found != null) {
                                found.update({shoppingCart: true});
                                res.status(200).send('Product successfully added to the shopping cart');
                            }
                        });
                }
            }
        }
    });


/**
 * Get all the products of the shopping cart of a specific user
 */
shoppingCartController.get('/getAll/:userId', (req: Request, res: Response) => {
    Cart.findAll({where: {userId: req.params.userId}, include: [Cart.associations.product]})
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


/**
 *  Deletes a product from the shopping cart list by providing the cartId
 */
shoppingCartController.delete('/delete/:cartId', (req: Request, res: Response) => {
    Cart.findOne({where: {cartId: req.params.cartId}})
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send('Product removed'));
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => res.status(500).send(err));
});

/**
 * Gets one specific product from the shopping cart by providing the cartId
 */
shoppingCartController.get('/getProduct/:id', (req: Request, res: Response) => {
    Cart.findByPk(req.params.id)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

/**
 * Edits a product in the shopping cart or wish list by providing the cartId.
 */
shoppingCartController.put('/edit/:cartId', (req: Request, res: Response) => {
    Cart.findOne({
        where: {cartId: req.params.cartId},
        include: [Cart.associations.product]
    })
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
