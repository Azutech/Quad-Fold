import { Router } from 'express'
import { addToCart, removeFromCart } from '../controllers/cart'

export const cart = Router()

cart.post('/addToCart', addToCart)
cart.delete('/removefromCart/:cartId/:productId', removeFromCart)
