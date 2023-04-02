import { Request, Response} from "express";
import { Coupon } from "../models/coupons";
import { Cart } from "../models/cart";


export const createCoupons = async(req: Request, res: Response)=> {
    const {code, discountType, discountAmount} = req.body

   try {
    const coupons = await Coupon.create({
        code,
        discountType,
        discountAmount
    
    })

    if (!coupons) {
        return res.status(404).json({
            status: 'fail',
            message: 'Unable to create coupons',
        })
    }
    return res.status(202).json({msg: 'coupons successfully added', status: 'success', data: coupons})
   } catch (err: any) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
   }
}

export const discount = async(req: Request, res: Response) => {
    const {code } = req.body

    const coupon = await Coupon.findOne({where: {code: code}})

    if (!coupon) {
        return res.status(404).json({err: 'Invalid Coupon Code'})
    }

    const cart = await Cart.findAll()

    if (cart.length === 0) {
        return res.status(404).json({err: "cart is empty"})
    }


} 