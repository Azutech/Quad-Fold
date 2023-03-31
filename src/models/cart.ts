import { sequelize, DataTypes } from '../connection/database'
import { Model } from 'sequelize'

export class Cart extends Model {
    public id!: number
    public productId!: string
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
