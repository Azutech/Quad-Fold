"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const database_1 = require("../connection/database");
const sequelize_1 = require("sequelize");
class Cart extends sequelize_1.Model {
}
exports.Cart = Cart;
Cart.init({
    id: {
        type: database_1.DataTypes.UUID,
        defaultValue: database_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    productId: {
        type: database_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'products',
            key: 'productId',
        },
    },
    quantity: {
        type: new database_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    total: {
        type: database_1.DataTypes.FLOAT,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'cart',
    timestamps: true,
});
// Cart.belongsTo(Product, { foreignKey: 'productId' });
