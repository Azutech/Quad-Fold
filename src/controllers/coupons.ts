import { Request, Response } from 'express'
import { Coupon } from '../models/coupons'
import { Cart } from '../models/cart'

export const createCoupons = async (req: Request, res: Response) => {
    const { code, discountType, discountAmount } = req.body

    try {
        const coupons = await Coupon.create({
            code,
            discountType,
            discountAmount,
        })

        if (!coupons) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to create coupons',
            })
        }
        return res.status(202).json({
            msg: 'coupons successfully added',
            status: 'success',
            data: coupons,
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

export const discount = async (req: Request, res: Response) => {
    const { code } = req.body

    try {
        const coupon = await Coupon.findOne({ where: { code: code } })

        if (!coupon) {
            return res.status(404).json({ err: 'Invalid Coupon Code' })
        }

        const cart = await Cart.findAll()

        if (cart.length === 0) {
            return res.status(404).json({ err: 'cart is empty' })
        }

        const totalPrice = cart.reduce(
            (acc: number, item: Cart) => acc + Number(item.total),
            0
        )

        let discountAmount = 0
        let adjustedPrice = totalPrice

        if (coupon.code === 'Coupon FIXED10') {
            if (totalPrice >= 50 && cart.length >= 1) {
                discountAmount = 10
                adjustedPrice = totalPrice - discountAmount
            }
        } else if (coupon.code === 'Coupon PERCENT10') {
            if (totalPrice >= 100 && cart.length >= 2) {
                discountAmount = totalPrice * 0.1
                adjustedPrice = totalPrice - discountAmount
            }
        } else if (coupon.code === 'Coupon MIXED10') {
            if (totalPrice >= 200 && cart.length >= 3) {
                discountAmount = totalPrice * 0.1
                adjustedPrice = totalPrice - discountAmount
            }
        } else {
            return 'Invalid Coupon Code'
        }

        return res.status(202).json({
            msg: 'Coupon successfully applied',
            data: adjustedPrice,
            discountAmount,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
export const findAllCoupons = async (req: Request, res: Response) => {
    try {
        const name = req.query.name ? { category: req.query.name } : {}
        const allCoupons = req.query.search
            ? {
                  name: {
                      $regex: req.query.regex,
                      options: 'i',
                  },
              }
            : {}

        const coupons = await Coupon.findAll({ where: allCoupons })
        res.status(200).json({
            message: 'all coupons retrieved',
            data: coupons,
        })
    } catch (err) {
        res.status(505).json({
            status: 'error',
            message: 'Unable to retrieve all coupons',
        })
    }
}

export const getOneCoupon = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const coupons = await Coupon.findByPk(id)

        if (!coupons) {
            return res.status(404).json({
                message: `coupon with the ${coupons} not found`,
            })
        }
        res.status(200).json({
            status: 'success',
            data: coupons,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Unable to retrieve the coupon',
        })
    }
}

export const destroyCoupon = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const coupons = await Coupon.destroy({ where: { id: id } })

        if (!coupons) {
            return res.status(404).json({
                message: `coupon with the ${coupons} not found`,
            })
        }
        res.status(200).json({
            message: 'coupon has been deleted successfully',
            status: 'success',
            data: coupons,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Unable to destroy the coupon',
        })
    }
}
