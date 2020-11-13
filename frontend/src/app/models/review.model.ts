import {Product} from "./product.model";

export class Review {
  constructor(
    // Id of the review
    public reviewId: number,
    // Id of the User who bought the reviewing product
    public buyerUserId: number,
    // Name of the User who bought the reviewing product
    public buyerUserName: number,
    // Id of the User who sold the reviewing product
    public sellerUserId: number,
    // Id of the product to which review is given
    public productId: number,
    // Review text
    public reviewText: string,
    // Numeric rating od the user to the product
    public rating: number,
    // The product to whom the review belongs
    public product: Product,
  ) {
  }
}
