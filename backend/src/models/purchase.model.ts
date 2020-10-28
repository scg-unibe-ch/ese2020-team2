
import { User, UserAttributes, UserCreationAttributes } from './user.model';
import { Product, ProductAttributes, ProductCreationAttributes } from './product.model';
import { Optional, Model, Sequelize, DataTypes, STRING } from 'sequelize';

/*This is the Purchase model used to save the data about purchases*/
export interface PurchaseAttributes {
    // Id of the purchase
    purchaseId: number;
    // Id of the product
    productId: number;
    // quantity or number of items purchsed
    quantity: number;
    // Name of the user who is buying the product.
    buyingUserName: string;
    // Price in points
    deliveryAddress: string;
    // Type of payment. Allows 'Cash on Delivery' and 'wallet  points'.
    paymentType: string;
    // True if the payment is done with wallet points.
    walletPayment: boolean;
}

export interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'purchaseId'> { }

export class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
    purchaseId!: number;
    productId!: number;
    quantity!: number;
    buyingUserName!: string;
    deliveryAddress!: string;
    paymentType!: string;
    walletPayment!: boolean;

    public static initialize(sequelize: Sequelize) {
        Purchase.init({
            purchaseId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // references: {
                //     model: 'Product',
                //     key: 'productId'
                // }
            },
            quantity: {
                type: DataTypes.NUMBER,
                allowNull: false,
                defaultValue: 1
            },
            buyingUserName: {
                type: DataTypes.STRING,
                allowNull: false,
                // references: {
                //     model: 'User',
                //     key: 'userId'
                // }

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
            }
        },
            {
                sequelize,
                tableName: 'purchases'
            }
        );
    }

}
