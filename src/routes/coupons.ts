import { Router } from 'express'
import {
    createCoupons,
    discount,
    findAllCoupons,
    getOneCoupon,
    destroyCoupon,
} from '../controllers/coupons'

export const coupons = Router()

coupons.post('/createCoupons', createCoupons)
coupons.post('/coupons/discount', discount)
coupons.get('/getAllCoupons', findAllCoupons)
coupons.get('/getOneCoupons/:id', getOneCoupon)
coupons.get('/destroyCoupons/:id', destroyCoupon)
