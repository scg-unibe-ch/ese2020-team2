import {Product} from './product.model';

export class ShoppingCart {

  constructor(

    public sellerReview: string[],
    // Id of the shopping Cart
    public cartId: number,
    // Id of the product
    public productId: number,
    // If of the User which holds the products
    public userId: number,
    // quantity or number of items purchased
    public quantity: number,
    // Name of the user who is buying the product.
    public buyerUserId: number,
    // Name of the user who is selling the product.
    public sellerUserId: number,
    // The product itself
    public product: Product,
    // True if product in wish list
    public shoppingCart: boolean,
    // True if product is in the wish list
    public wishList: boolean,
    // True if the buyer wants the product to be delivered
    public deliveryRequested: boolean,
  ) {}
}
