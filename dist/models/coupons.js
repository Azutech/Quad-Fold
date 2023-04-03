"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const database_1 = require("../connection/database");
const sequelize_1 = require("sequelize");
class Coupon extends sequelize_1.Model {
}
exports.Coupon = Coupon;
Coupon.init({
    id: {
        type: database_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: new database_1.DataTypes.STRING(32),
        allowNull: false,
    },
    discountType: {
        type: new database_1.DataTypes.STRING(),
        allowNull: false,
    },
    discountAmount: {
        type: database_1.DataTypes.INTEGER(),
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'coupons',
    timestamps: true,
});
