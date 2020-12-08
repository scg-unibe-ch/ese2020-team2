export class User {

  constructor(
    // The Id uf the user
    public userId: number,
    // The user name
    public userName: string,
    // The password
    public password: string,
    // The email
    public email: string,
    // The first name
    public firstName: string,
    // The last name
    public lastName: string,
    // The gender
    public gender: string,
    // The street
    public street: string,
    // The pin code
    public pinCode: string,
    // The city
    public city: string,
    // The country
    public country: string,
    // The money the user possesses
    public moneyInWallet: number,
    // The role the user has, either user or admin
    public role: string,
  ) {}
}
