import {sequelize, DataTypes} from  '../connection/database'

export const cart = sequelize.define('products', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: new DataTypes.FLOAT(),
        allowNull: false,
      },
})