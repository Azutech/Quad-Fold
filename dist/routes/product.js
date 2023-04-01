"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const express_1 = require("express");
const products_1 = require("../controllers/products");
exports.product = (0, express_1.Router)();
exports.product.post('/addProducts', products_1.createProduct);
