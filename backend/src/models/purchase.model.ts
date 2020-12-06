import {
    Optional,
    Model,
    Sequelize,
    DataTypes,
    Association,
    BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';

// This is the Purchase model used to save the data about purchases
export interface PurchaseAttributes {
    // Id of the purchase
    purchaseId: number;
    // Id of the product
    productId: number;
    // quantity or number of items purchased
    quantity: number;
    // Name of the user who is buying the product.
    buyerUserId: number;
    // Name of the user who is selling the product.
    sellerUserId: number;
    // Holds the delivery address
    deliveryAddress: string;
    // Type of payment. Allows 'Cash on Delivery' and 'wallet  points'.
    paymentType: string;
    // True if the payment is done with wallet points.
    walletPayment: boolean;
    // True if the User saw the Notification.
    notificationCheck: boolean;
    // Type of purchase. Sell or Lent. true for 'sell' and false for 'lend'
    isSold: boolean;
}

export interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'purchaseId'> { }

export class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {

    public static associations: {
        buyer: Association <Purchase, User>;
        seller: Association <Purchase, User>;
        product: Association<Purchase, Product>;
    };

    public getUsers!: BelongsToGetAssociationMixin<User>;
    public addUsers!: BelongsToSetAssociationMixin<User, number>;
    public getProduct!: BelongsToGetAssociationMixin<Product>;
    public addProduct!: BelongsToSetAssociationMixin<Product, number>;


    public readonly buyer?: User;
    public readonly seller?: User;
    public readonly product?: Product;

    purchaseId!: number;
    productId!: number;
    quantity!: number;
    buyerUserId!: number;
    sellerUserId!: number;
    deliveryAddress!: string;
    paymentType!: string;
    walletPayment!: boolean;
    notificationCheck!: boolean;
    isSold!: boolean;

    public static initialize(sequelize: Sequelize) {
        Purchase.init({
            purchaseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.NUMBER,
                allowNull: false,
                defaultValue: 1
            },
            buyerUserId: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            sellerUserId: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            deliveryAddress: {
                type: DataTypes.STRING
            },
            paymentType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'wallet points'
            },
            walletPayment: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            notificationCheck: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isSold: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        },
            {
                sequelize,
                tableName: 'purchases'
            }
        );
    }
    public static createAssociations() {
        Purchase.belongsTo(User, {
            targetKey: 'userId',
            as: 'buyer',
            foreignKey: 'buyerUserId',
            constraints: false
        });
        Purchase.belongsTo(User, {
            targetKey: 'userId',
            as: 'seller',
            foreignKey: 'sellerUserId',
            constraints: false
        });
        Purchase.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            foreignKey: 'productId',
            constraints: false
        });
    }
}
