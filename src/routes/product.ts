import { Router } from 'express'
import { createProduct } from '../controllers/products'

export const product = Router()

product.post('/addProducts', createProduct)
