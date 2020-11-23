export class Purchase {
      constructor(
        // Id of the purchase
        public purchaseId: number,
  // Id of the product
        public productId: number,
  // quantity or number of items purchased
        public quantity: number,
  // Name of the user who is buying the product.
        public buyerUserId: number,
  // Name of the user who is selling the product.
        public sellerUserId: number,
  // Price in points
        public deliveryAddress: string,
  // Type of payment. Allows 'Cash on Delivery' and 'wallet  points'.
        public paymentType: string,
  // True if the payment is done with wallet points.
        public walletPayment: boolean,
  // True if the User saw the Notification
        public notificationCheck: boolean,

      ) {}
      getPurchaseId(){return this.purchaseId}
    }
