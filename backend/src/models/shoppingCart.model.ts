import {
    Optional,
    Model,
    Sequelize,
    DataTypes,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin
} from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';

/*This is the ShoppingCart model used to save the data about the shopping cart list*/

export interface CartAttributes {
    // Id of the shopping Cart
    cartId: number;
    // Id of the product
    productId: number;
    // If of the User which holds the products
    userId: number;
    // quantity or number of items purchased
    quantity: number;
    // Name of the user who is buying the product.
    buyerUserId: number;
    // Name of the user who is selling the product.
    sellerUserId: number;
    // True if product in wish list
    shoppingCart: boolean;
    // True if product is in the wish list
    wishList: boolean;
    // True if the buyer wants the product to be delivered
    deliveryRequested: boolean;
}

export interface CartCreationAttributes extends Optional<CartAttributes, 'cartId'> { }

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {

    public static associations: {
        user: Association <Cart, User>;
        product: Association <Cart, Product>;
    };

    public getUser!: BelongsToGetAssociationMixin<User>;
    public addUser!: BelongsToSetAssociationMixin<User, number>;
    public getProduct!: BelongsToGetAssociationMixin<Product>;
    public addProduct!: BelongsToSetAssociationMixin<Product, number>;

    public readonly user?: User;
    public readonly product?: Product;

    cartId!: number;
    productId!: number;
    userId!: number;
    quantity!: number;
    buyerUserId!: number;
    sellerUserId!: number;
    shoppingCart!: boolean;
    wishList!: boolean;
    deliveryRequested!: boolean;


    public static initialize(sequelize: Sequelize) {
        Cart.init({
                cartId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    unique: true
                },
                productId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1
                },
                buyerUserId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                sellerUserId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                shoppingCart: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                wishList: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                deliveryRequested: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },

        },
            {
                sequelize,
                tableName: 'shoppingCart'
            }
        );
    }
    public static createAssociations() {
        Cart.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            foreignKey: 'userId',
            constraints: false
        });
        Cart.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            foreignKey: 'productId',
            constraints: false
        });
    }
}
