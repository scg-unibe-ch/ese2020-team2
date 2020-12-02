import {Optional, Model, Sequelize, DataTypes, } from 'sequelize';
import { Product } from './product.model';
import { User } from './user.model';

// This is the Product model used to save the data about products
export interface ProductImageAttributes {
    // Holds the picture id of the product image uploaded
    fileId: number;
    // Id of the product
    productId: number;
    // Id of the user
    userId: number;
    // Holds the uploaded file Name
    fileName: string;
}
export interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'fileId'> { }

export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
    fileId!: number;
    productId!: number;
    userId!: number;
    fileName!: string;

    public static initialize(sequelize: Sequelize) {
        ProductImage.init({
                fileId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                productId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                fileName: {
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
        ProductImage.belongsTo(User);
        ProductImage.belongsTo(Product);
    }
}
