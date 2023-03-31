import { sequelize, DataTypes } from '../connection/database'
import { Model } from 'sequelize'

export class Product extends Model {
    public id!: number
    public name!: string
    public description!: string
    public price!: number
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description : {
            type: DataTypes.STRING,
            allowNull: false,

        },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: true,
    }
)
