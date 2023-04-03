import { sequelize, DataTypes } from '../connection/database'
import { Model } from 'sequelize'
import { Product } from './products'

export class Cart extends Model {
    public id!: number
    public productId!: number
    public total!: string
    public quantity!: number
}

Cart.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products',
                key: 'productId',
            },
        },

        quantity: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },

        total: {
            type: DataTypes.FLOAT,
        },
    },
    {
        sequelize,
        tableName: 'cart',
        timestamps: true,
    }
)

// Cart.belongsTo(Product, { foreignKey: 'productId' });
