"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const product_1 = require("./product");
const cart_1 = require("./cart");
exports.routes = (0, express_1.Router)();
exports.routes.use('/products', product_1.product);
exports.routes.use('/cart', cart_1.cart);
