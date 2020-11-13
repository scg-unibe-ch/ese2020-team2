
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
    // Name of the User who bought the reviewing product
    buyerUserName: string;
    // Id of the User who sold the reviewing product
    sellerUserId: number;
    // Id of the product to which review is given
    productId: number;
    // Review text
    reviewText: string;
    // Numeric rating od the user to the product
    rating: number;

}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'reviewId'> { }

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    reviewId!: number;
    buyerUserId!: number;
    buyerUserName!: string;
    sellerUserId!: number;
    productId!: number;
    reviewText!: string;
    rating!: number;


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
            buyerUserName: {
                type: DataTypes.STRING,
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
    }
}
