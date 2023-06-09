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
    } catch (err: any) {
        console.error(err)
        res.status(504).json({
            pst: 'Error adding product to cart',
            msg: err.message,
        })
    }
}

export const removeFromCart = async (req: Request, res: Response) => {
    const { productId, cartId } = req.params

    try {
        const product = await Product.findByPk(productId)
        if (!product) {
            return res.status(404).json({ err: 'Product does not exist' })
        }
        const cart = await Cart.findByPk(cartId)
        if (!cart) {
            return res.status(404).json({ err: 'Cart not found' })
        }

        const destroy = await Cart.destroy({ where: { productId: productId } })

        return res.status(201).json({
            message: 'Product has been removed successfully',
            data: destroy,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'server error' })
    }
}
