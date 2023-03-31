import { Router } from 'express'
import { product } from './product'

export const routes = Router()

routes.use('/products', product)
