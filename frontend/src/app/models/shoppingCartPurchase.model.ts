export class ShoppingCartPurchase {
  constructor(
    // Id of the product
    public productId: number,
    // quantity or number of items purchased
    public quantity: number,
    // Name of the user who is buying the product.
    public buyerUserId: number,
    // Name of the user who is selling the product.
    public sellerUserId: number,
    // The delivery address
    public deliveryAddress: string,
    // True if the buyer wants the product to be delivered
    public deliveryRequested: boolean,
  ) {}
}
