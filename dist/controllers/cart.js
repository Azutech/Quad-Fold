"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = void 0;
const cart_1 = require("../models/cart");
const products_1 = require("../models/products");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    try {
        const product = yield products_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const total = product.price * quantity;
        const cartItem = yield cart_1.Cart.create({
            productId,
            quantity,
            total,
        });
        res.status(200).json({
            message: 'Product added to cart',
            data: cartItem,
        });
    }
    catch (err) {
        console.error(err);
        res.status(504).json({
            pst: 'Error adding product to cart',
            msg: err.message,
        });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, cartId } = req.params;
    try {
        const product = yield products_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ err: 'Product does not exist' });
        }
        const cart = yield cart_1.Cart.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ err: 'Cart not found' });
        }
        const destroy = yield cart_1.Cart.destroy({ where: { productId: productId } });
        return res.status(201).json({
            message: 'Product has been removed successfully',
            data: destroy,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ err: 'server error' });
    }
});
exports.removeFromCart = removeFromCart;
