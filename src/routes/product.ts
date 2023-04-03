import { Router } from 'express'
import {
    createProduct,
    getOneProduct,
    findAllProducts,
    destroyProduct,
} from '../controllers/products'

export const product = Router()

product.post('/addProducts', createProduct)
product.get('/getOneProduct/:id', getOneProduct)
product.get('/getAllProducts', findAllProducts)
product.delete('/destroyOneProduct/:id', destroyProduct)
