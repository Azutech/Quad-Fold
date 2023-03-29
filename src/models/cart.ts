import {sequelize, DataTypes} from  '../connection/database'


export const cart = sequelize.define('cart', {
    id : {
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
})