
import {Optional, Model, Sequelize, DataTypes } from 'sequelize';

/*This is the Product model used to save the data about products*/
export interface ProductAttributes {
    // Id of the product
    productId: number;
    // If of the User which holds the products
    userId: number;
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
    // Type of purchase of the product. Sell or lend
    sellOrLend: string;
    // Number of items available
    piecesAvailable: number;
    // Status if the product is available or lent or sold out
    status: string;
    // Parameter for adding the Product Image
    // productImages: Array<object>;
    // Possibility of door delivery. True by default
    deliveryPossible: boolean;
    // Approval from the Admin. 'pending' by default. Changes when the admin approved to approved or rejected
    // Allowed inputs: (approved, rejected, pending)
    adminApproval: string;
    // Reason message in case of disapproval by admin.
    disapprovalMsg: string;
    // Product visibility in market place. True by default
    visibleInMarket: boolean;
    // Needed to grade the seller behavior (review)
    sellerReview: String[];
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    userId!: number;
    type!: string;
    title!: string;
    userName!: string;
    price!: number;
    description!: string;
    location!: string;
    sellOrLend!: string;
    piecesAvailable: number;
    status!: string;
    // productImages!: Array<object>;
    deliveryPossible!: boolean;
    adminApproval!: string;
    disapprovalMsg!: string;
    visibleInMarket!: boolean;
    sellerReview!: String[];

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
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
            sellOrLend: {
                type: DataTypes.STRING,
                allowNull: false
            },
            piecesAvailable: {
                type: DataTypes.NUMBER,
                allowNull: false,
                defaultValue: 1
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'available'
            },
            deliveryPossible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            /*
                productImages: {
                    // type: DataTypes.ARRAY
                    type: DataTypes.STRING,
                },
             */
            adminApproval: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending'
            },
            disapprovalMsg: {
                type: DataTypes.STRING
            },
            visibleInMarket: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            sellerReview: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'empty'
            }
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }

}
