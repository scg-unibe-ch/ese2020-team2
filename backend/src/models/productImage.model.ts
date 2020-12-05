import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';
import {Product} from './product.model';

export interface ProductImageAttributes {
    // Holds the picture id of the product image uploaded.
    productImageId: number;
    // Id of the product.
    productId: number;
    // Id of the user.
    userId: number;
    // Holds the uploaded file path.
    filePath: string;
}

export interface ProductImageCreationAttributes extends Optional<ProductImage, 'productImageId'> { }
export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
    productImageId: number;
    userId!: number;
    productId!: number;
    filePath!: string;

    public static initialize(sequelize: Sequelize) {
        ProductImage.init({
            productImageId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            filePath: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'productImages'
         }
        );
    }
    public static createAssociations() {
        ProductImage.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            foreignKey: 'userId',
            constraints: false
        });
        ProductImage.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            foreignKey: 'productId',
            constraints: false
        });
    }
}
