"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = require("../connection/database");
const sequelize_1 = require("sequelize");
const cart_1 = require("./cart");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: database_1.DataTypes.UUID,
        defaultValue: database_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: database_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: database_1.DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'products',
    timestamps: true,
});
Product.hasMany(cart_1.Cart, { foreignKey: 'productId' });
