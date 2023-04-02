import { Router } from 'express'
import { createProduct ,getOneProduct, findAllProducts, destroyProduct} from '../controllers/products'

export const product = Router()

product.post('/addProducts', createProduct)
product.get('/addProducts/:id', getOneProduct)
product.get('/addProducts', findAllProducts)
product.delete('/addProducts/:id', destroyProduct)
