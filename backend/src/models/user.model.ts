import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';
import { Purchase } from './purchase.model';
import { Review } from './review.model';

export interface UserAttributes {
    userId: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    telephone: string;
    street: string;
    pinCode: string;
    city: string;
    country: string;
    moneyInWallet: number;
    role: string;
    passwordQuestion: string;
    passwordAnswer: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    telephone!: string;
    street!: string;
    pinCode!: string;
    city!: string;
    country!: string;
    moneyInWallet!: number;
    role!: string;
    passwordQuestion!: string;
    passwordAnswer!: string;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
            },
            telephone: {
                type: DataTypes.STRING,
            },
            street: {
                type: DataTypes.STRING,
            },
            pinCode: {
                type: DataTypes.STRING,
            },
            city: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING,
            },
            moneyInWallet: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 100,
                validate: {
                    min: 0
                }
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user'
            },
            passwordQuestion: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            },
            passwordAnswer: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            },
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
    public static createAssociations() {
        User.hasMany(Product, {
            as: 'product',
            foreignKey: 'productId',
            constraints: false
        });
        User.hasMany(Purchase, {
            as: 'purchase',
            foreignKey: 'purchaseId',
            constraints: false
        });
        User.hasMany(Purchase, {
            as: 'soldOrLent',
            foreignKey: 'sellerUserId',
            constraints: false
        });
        User.hasMany(Review, {
            as: 'review',
            foreignKey: 'reviewId',
            constraints: false
        });
    }
}
