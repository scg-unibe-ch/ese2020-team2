import {Approval} from './approval';

export class Product {

  constructor(

    public sellerReview: string[],
    public productId: number,
    public type: string,
    public title: string,
    public price: number,
    public isPremier: boolean,
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
