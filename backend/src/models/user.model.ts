import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import {Optional, Model, Sequelize, DataTypes, STRING, DOUBLE} from 'sequelize';

/**
 * The responsibility of this class is to hold all attributes that we need to configure an user registration.
 *
 * Here are defined the attributes of the user, these define the type of input expected in the filling brackets
 * in a registration.
 */

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
    pinCode: number;
    city: string;
    country: string;
    // moneyInWallet: number;
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
    pinCode!: number;
    city!: string;
    country!: string;
    // moneyInWallet!: number;

    /**
     * TODO: add description
     *
     * @param sequelize
     */

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
                type: DataTypes.NUMBER,
            },
            city: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING,
            },
            /**
            moneyInWallet: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 100,
                validate: {
                    min: 0
                }
            }*/
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}
