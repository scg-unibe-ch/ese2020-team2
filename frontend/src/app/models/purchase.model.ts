export class Purchase {
      constructor(
    
    
        public productId: number,
        public quantity: number,
        public buyingUserId: number,
        public deliveryAddress: string,
        public paymentType: string,

      ) {}
    }