import { Request, Response } from 'express'
import { Cart } from '../models/cart'
import { Product } from '../models/products'

export const addToCart = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body

    try {
        const product = await Product.findByPk(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const total = product.price * quantity

        const cartItem = await Cart.create({
            productId,
            quantity,
            total,
        })
        res.status(200).json({
            message: 'Product added to cart',
            data: cartItem,
        })
    } catch (err) {
        console.error(err)
        res.status(404).json({message:  'Error adding product to cart'})
    }
}
