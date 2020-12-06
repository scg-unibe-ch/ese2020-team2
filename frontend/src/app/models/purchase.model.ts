import {User} from "./user.model";
import {Product} from "./product.model";

export class Purchase {
  constructor(
    // Id of the purchase
    public purchaseId: number,
    // Id of the product
    public productId: number,
    // quantity or number of items purchased
    public quantity: number,
    // Id of the user who is buying the product.
    public buyerUserId: number,
    // Id of the user who is selling the product.
    public sellerUserId: number,
    // Price in points
    public deliveryAddress: string,
    // Type of payment. Allows 'Cash on Delivery' and 'wallet  points'.
    public paymentType: string,
    // True if the payment is done with wallet points.
    public walletPayment: boolean,
    // New, Pending or Shipped if the User saw the Notification
    public notificationCheck: string,
    // True if the buyer wants the product to be delivered
    public deliveryRequested: boolean,
    // Data of the buyer
    public user: User,
    // Data of the product sold
    public product: Product,

  ) {}
  getPurchaseId(){return this.purchaseId}
}
