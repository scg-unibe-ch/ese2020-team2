
import { Optional, Model, Sequelize, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import { User } from './user.model';
import { Purchase } from './purchase.model';
import { Review } from './review.model';
import { ProductImage } from './productImage.model';


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
    // productImages: object[];
    // Possibility of door delivery. True by default
    deliveryPossible: boolean;
    // Approval from the Admin. 'pending' by default. Changes when the admin approved to approved or rejected.
    // Allowed inputs: (approved, rejected, pending)
    adminApproval: string;
    // Reason message in case of disapproval by admin.
    disapprovalMsg: string;
    // Product visibility in market place. True by default
    visibleInMarket: boolean;
    // Average of rating given by the users whose bought the product.
    productRating: number;
    // True if the product is premier.
    isPremier: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    userId!: number;
    type!: string;
    title!: string;
    price!: number;
    description!: string;
    location!: string;
    sellOrLend!: string;
    piecesAvailable: number;
    status!: string;
    deliveryPossible!: boolean;
    adminApproval!: string;
    disapprovalMsg!: string;
    visibleInMarket!: boolean;
    productRating!: number;
    isPremier!: boolean;

    public getProductImage!: HasManyGetAssociationsMixin<ProductImage>;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
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
                defaultValue: false
            },
            productRating: {
                type: DataTypes.NUMBER,
                allowNull: false,
                defaultValue: 0
            },
            isPremier: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }
    public static createAssociations() {
        Product.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            foreignKey: 'userId',
            constraints: false
        });
        Product.hasMany(Purchase, {
            as: 'purchase',
            foreignKey: 'purchaseId',
            constraints: false
        });
        Product.hasMany(Review, {
            as: 'review',
            foreignKey: 'reviewId',
            constraints: false
        });
        Product.hasMany(ProductImage, {
            as: 'Images',
            foreignKey: 'fileId',
            constraints: false
        });
    }
}
