import { Optional, Model, Sequelize, DataTypes } from 'sequelize';


/*This is the Product model used to save the data about products*/
export interface WalletAttributes {

    // Type of the product: Product or Service
    userId: string;
    // Name of the user who created the product/service
    userName: string;
    // Amount in the wallet
    walletAmount: number;
    // Amount earned/charged
    walletIncome: number;
    // Amount spent/Withdrawn
    walletOutcome: number;
}

export interface WalletCreationAttributes extends Optional<WalletAttributes, 'walletAmount'> { }

export class Wallet extends Model<WalletAttributes, WalletCreationAttributes> implements WalletAttributes {
    userId!: string;
    userName!: string;
    walletAmount!: number;
    walletIncome!: number;
    walletOutcome!: number;

    public static initialize(sequelize: Sequelize) {
        Wallet.init({
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
                walletAmount: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    validate: {
                        min: 0
                    }
                },
                walletIncome: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    validate: {
                        min: 0
                    }
                },
                walletOutcome: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    validate: {
                        max: 0
                    }
                }
            },
            {
                sequelize,
                tableName: 'wallet'
            }
        );
    }
}
