
export class User {

  constructor(
    public userId: number,
    public userName: string,
    public password: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public telephone: string,
    public street: string,
    public pinCode: string,
    public city: string,
    public country: string,
    public moneyInWallet: number,
    public role: string,
  ) {}
}
