import { Request, Response} from "express";
import { Coupon } from "../models/coupons";


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