import { sequelize, DataTypes } from '../connection/database'

export const coupons = sequelize.define('coupons', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: new DataTypes.STRING(32),
        allowNull: false,
    },
    discountPercentage: {
        type: new DataTypes.FLOAT(),
        allowNull: false,
    },
})
