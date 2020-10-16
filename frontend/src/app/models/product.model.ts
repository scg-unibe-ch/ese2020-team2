import {Approval} from "./approval";

export class Product {

//Has to be extended
  constructor(
    public userName: string,
    public title: string,
    public approved: Approval,
    public appearMarketplace: boolean,
    public disapprovalMessage: string,
  ) {}
}
