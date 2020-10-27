export class Purchase {

    //Has to be extended
      constructor(
    
    
        public productId: number,
        public quantity: number,
        public buyingUserId: number,
        public deliveryAddress: string,

      ) {}
    }