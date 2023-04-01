"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coupons = void 0;
const database_1 = require("../connection/database");
exports.coupons = database_1.sequelize.define('coupons', {
    id: {
        type: database_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: new database_1.DataTypes.STRING(32),
        allowNull: false,
    },
    discountPercentage: {
        type: new database_1.DataTypes.FLOAT(),
        allowNull: false,
    },
});
