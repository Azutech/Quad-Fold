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
exports.destroyCoupon = exports.getOneCoupon = exports.findAllCoupons = exports.discount = exports.createCoupons = void 0;
const coupons_1 = require("../models/coupons");
const cart_1 = require("../models/cart");
const createCoupons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, discountType, discountAmount } = req.body;
    try {
        const coupons = yield coupons_1.Coupon.create({
            code,
            discountType,
            discountAmount,
        });
        if (!coupons) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to create coupons',
            });
        }
        return res.status(202).json({
            msg: 'coupons successfully added',
            status: 'success',
            data: coupons,
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
exports.createCoupons = createCoupons;
const discount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        const coupon = yield coupons_1.Coupon.findOne({ where: { code: code } });
        if (!coupon) {
            return res.status(404).json({ err: 'Invalid Coupon Code' });
        }
        const cart = yield cart_1.Cart.findAll();
        if (cart.length === 0) {
            return res.status(404).json({ err: 'cart is empty' });
        }
        const totalPrice = cart.reduce((acc, item) => acc + Number(item.total), 0);
        let discountAmount = 0;
        let adjustedPrice = totalPrice;
        if (coupon.code === 'Coupon FIXED10') {
            if (totalPrice >= 50 && cart.length >= 1) {
                discountAmount = 10;
                adjustedPrice = totalPrice - discountAmount;
            }
        }
        else if (coupon.code === 'Coupon PERCENT10') {
            if (totalPrice >= 100 && cart.length >= 2) {
                discountAmount = totalPrice * 0.1;
                adjustedPrice = totalPrice - discountAmount;
            }
        }
        else if (coupon.code === 'Coupon MIXED10') {
            if (totalPrice >= 200 && cart.length >= 3) {
                discountAmount = totalPrice * 0.1;
                adjustedPrice = totalPrice - discountAmount;
            }
        }
        else {
            return 'Invalid Coupon Code';
        }
        return res.status(202).json({
            msg: 'Coupon successfully applied',
            data: adjustedPrice,
            discountAmount,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.discount = discount;
const findAllCoupons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name ? { category: req.query.name } : {};
        const allCoupons = req.query.search
            ? {
                name: {
                    $regex: req.query.regex,
                    options: 'i',
                },
            }
            : {};
        const coupons = yield coupons_1.Coupon.findAll({ where: allCoupons });
        res.status(200).json({
            message: 'all coupons retrieved',
            data: coupons,
        });
    }
    catch (err) {
        res.status(505).json({
            status: 'error',
            message: 'Unable to retrieve all coupons',
        });
    }
});
exports.findAllCoupons = findAllCoupons;
const getOneCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const coupons = yield coupons_1.Coupon.findByPk(id);
        if (!coupons) {
            return res.status(404).json({
                message: `coupon with the ${coupons} not found`,
            });
        }
        res.status(200).json({
            status: 'success',
            data: coupons,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Unable to retrieve the coupon',
        });
    }
});
exports.getOneCoupon = getOneCoupon;
const destroyCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const coupons = yield coupons_1.Coupon.destroy({ where: { id: id } });
        if (!coupons) {
            return res.status(404).json({
                message: `coupon with the ${coupons} not found`,
            });
        }
        res.status(200).json({
            message: 'coupon has been deleted successfully',
            status: 'success',
            data: coupons,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Unable to destroy the coupon',
        });
    }
});
exports.destroyCoupon = destroyCoupon;
