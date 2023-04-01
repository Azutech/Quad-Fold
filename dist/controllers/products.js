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
exports.destroyProduct = exports.findAllProducts = exports.getOneProduct = exports.createProduct = void 0;
const products_1 = require("../models/products");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const products = yield products_1.Product.create({
            name,
            price,
        });
        if (!products) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to add products',
            });
        }
        res.status(200).json({
            message: 'products has been created successfully',
            status: 'success',
            products,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
exports.createProduct = createProduct;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const products = yield products_1.Product.findByPk(id);
        if (!products) {
            return res.status(404).json({
                message: `product with the ${products} not found`,
            });
        }
        res.status(200).json({
            status: 'success',
            data: products,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Unable to retrieve the product',
        });
    }
});
exports.getOneProduct = getOneProduct;
const findAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name ? { category: req.query.name } : {};
        const allProducts = req.query.search
            ? {
                name: {
                    $regex: req.query.regex,
                    options: 'i',
                },
            }
            : {};
        const products = yield products_1.Product.findAll({ where: allProducts });
        res.status(200).json({
            message: 'all products retrieved',
            data: products,
        });
    }
    catch (err) {
        res.status(505).json({
            status: 'error',
            message: 'Unable to retrieve all products',
        });
    }
});
exports.findAllProducts = findAllProducts;
const destroyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const products = yield products_1.Product.destroy({ where: { id: id } });
        if (!products) {
            return res.status(404).json({
                message: `product with the ${products} not found`,
            });
        }
        res.status(200).json({
            message: 'product has been deleted successfully',
            status: 'success',
            data: products,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Unable to destroy the product',
        });
    }
});
exports.destroyProduct = destroyProduct;
