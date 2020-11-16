import {Approval} from "./approval";

export class Product {

//Has to be extended
  constructor(

    public sellerReview: string[],

    public productId: number,
    public type: string,
    public title: string,
    public userName: string,
    public price: number,
    public description: string,
    public userId: number,
    public location: string,
    public sellOrLend: string,
    public status: string,
    public deliveryPossible: boolean,
    public adminApproval: string,
    public disapprovalMsg: string,
    public piecesAvailable: number,
    public visibleInMarket: boolean,
    public productRating: number,


) {}
}
