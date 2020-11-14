
import { Optional, Model, Sequelize, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';
import { Purchase } from './purchase.model';
import { ProductImage } from './productImage.model';

/*This is the review model used to save the data about reviews*/

export interface ReviewAttributes {
    // Id of the review
    reviewId: number;
    // Id of the User who bought the reviewing product
    buyerUserId: number;
    // Id of the User who sold the reviewing product
    sellerUserId: number;
    // Id of the product to which review is given
    productId: number;
    // Id of the purchase to which review belongs to
    purchaseId: number;
    // Review text
    reviewText: string;
    // Numeric rating od the user to the product
    rating: number;
    // True if the User saw the notification
    notificationCheck: boolean;

}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'reviewId'> { }

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    reviewId!: number;
    buyerUserId!: number;
    sellerUserId!: number;
    productId!: number;
    purchaseId!: number;
    reviewText!: string;
    rating!: number;
    notificationCheck!: boolean;


    public static initialize(sequelize: Sequelize) {
        Review.init({
            reviewId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            buyerUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sellerUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            purchaseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reviewText: {
                type: DataTypes.STRING(1024),
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            },
            notificationCheck: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
            {
                sequelize,
                tableName: 'reviews'
            }
        );
    }
    public static createAssociations() {
        Review.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            foreignKey: 'sellerUserId',
            constraints: false
        });
        Review.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            foreignKey: 'productId',
            constraints: false
        });
        Review.belongsTo(Purchase, {
            targetKey: 'purchaseId',
            as: 'purchase',
            foreignKey: 'purchaseId',
            constraints: false
        });
    }
}
