import { Router } from 'express'
import { product } from './product'
import { cart } from './cart'

export const routes = Router()

routes.use('/products', product)
routes.use('/cart', cart)
