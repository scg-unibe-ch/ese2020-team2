export class Purchase {
      constructor(
        // Id of the review
        public reviewId: number,
  // Id of the User who bought the reviewing product
        public buyerUserId: number,
  // Id of the User who slod the reviewing product
        public sellerUserId: number,
  // Id of the product to which review is given
        public productId: number,
  // Id of the purchase to which review belongs to
        public purchaseId: number,
  // Review text
        public reviewText: string,
  // Numeric rating od the user to the product
        public rating: number,

      ) {}
    }
