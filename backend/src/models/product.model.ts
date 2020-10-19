
import { User, UserAttributes, UserCreationAttributes } from './user.model';
import { Optional, Model, Sequelize, DataTypes, STRING } from 'sequelize';

/*This is the Product model used to save the data about products*/
export interface ProductAttributes {
    // Id of the product
    productId: number;
    // Type of the product: Product or Service
    type: string;
    // Title of the product
    title: string;
    // Name of the user who created the product/service
     userName: string;
    // Price in points
    price: number;
    // Product description
    description: string;
    // Available location
    location: string;
    // Sell or lend of product
    sellOrlend: string;
    // Status if the product is available or already lent
    status: string;
    // Possibility of door delivery. True by default
    deliveryPossible: boolean;
    // Approval from the Admin. False by default. Changes when the admin approved
    adminApproval: boolean;
    // Reason message in case of disapproval by admin.
    disapprovalMsg: string;
    // Product visibility in market place. True by default
    visibleInMarket: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    type!: string;
    title!: string;
    userName!: string;
    price!: number;
    description!: string;
    location!: string;
    sellOrlend!: string;
    status!: string;
    deliveryPossible!: boolean;
    adminApproval!: boolean;
    disapprovalMsg!: string;
    visibleInMarket!: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sellOrlend: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            deliveryPossible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            adminApproval: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            disapprovalMsg: {
                type: DataTypes.STRING
            },
            visibleInMarket: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }

}
