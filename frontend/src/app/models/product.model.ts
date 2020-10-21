import {Approval} from "./approval";

export class Product {

//Has to be extended
  constructor(


    public productId: number,
    public typ: string,
    public title: string,
    public userName: string,
    public price: number,
    public description: string,
    public location: string,
    public sellOrlend: string,
    public status: string,
    public deliveryPossible: boolean,
    public adminApproval: boolean,
    public disapprovalMsg: string,
    public visibleInMarket: boolean,
    public purchasedby: string,
  ) {}
}
