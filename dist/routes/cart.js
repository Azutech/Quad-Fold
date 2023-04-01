"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
exports.cart = (0, express_1.Router)();
exports.cart.post('/addToCart', cart_1.addToCart);
exports.cart.delete('/removefromCart/:cartId/:productId', cart_1.removeFromCart);
