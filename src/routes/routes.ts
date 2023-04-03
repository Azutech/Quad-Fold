import { Router } from 'express'
import { product } from './product'
import { cart } from './cart'
import { coupons } from './coupons'

export const routes = Router()

routes.use('/products', product)
routes.use('/cart', cart)
routes.use('/coupons', coupons)
