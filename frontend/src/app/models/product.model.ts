import {Approval} from './approval';

export class Product {

  constructor(

    public sellerReview: string[],
    // Id of the product
    public productId: number,
  // Type of the product: Product or Service
  public type: string,
  // Title of the product
  public title: string,
  // Price in points
    public price: number,
    // True if the product is premier.
    public isPremier: boolean,
    // Product description
    public description: string,
    // If of the User which holds the products
    public userId: number,
    // Available location
    public location: string,
    // Type of purchase of the product. Sell or lend
    public sellOrLend: string,
    // Status if the product is available or lent or sold out
    public status: string,
    // Possibility of door delivery. True by default
    public deliveryPossible: boolean,
    // Approval from the Admin. 'pending' by default. Changes when the admin approved to approved or rejected.
    // Allowed inputs: (approved, rejected, pending)
    public adminApproval: string,
    // Reason message in case of disapproval by admin.
    public disapprovalMsg: string,
    // Number of items available
    public piecesAvailable: number,
    // Product visibility in market place. True by default
    public visibleInMarket: boolean,
    // Average of rating given by the users whose bought the product.
    public productRating: number,
) {}
}
