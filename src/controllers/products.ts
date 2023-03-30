import {Request, Response} from 'express'
import { product } from '../models/products'


export const createProduct = async(req: Request, res: Response)=> {
    try {
        const {name, price} = req.body

        const products = await product.create({
            name,
            price
        })

        if(!products) { 
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to add products'
            })
        }
        res.status(200).json({
            message: 'products has been created successfully',
            status: 'success',
            products
        })
    } catch (err: any) {
        console.error(err)
        res.status(500).json({
            status: "error",
            message: err.message
        })
        
    }
}

export const getOneProduct = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const products = await product.findByPk(id)

        if (!products) {
            return res.status(404).json({
                message: `product with the ${products} not found`
            })
        }
        res.status(200).json({
            status: "success",
            data: products
        })
    } catch (err) {
        console.error(err)
       res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve the product'
       })
    }
}

export const findAllProducts = async (req: Request, res: Response) => {
    try {
        const name = req.query.name ? { category: req.query.name } : {};
        const allProducts =  req.query.search
        ? {
            name: {
              $regex: req.query.regex,
              options: 'i',
            },
          }
        : {};

        const products = await product.findAll({where: allProducts})
        res.status(200).json({
            message: 'all products retrieved',
            data: products
        })
    } catch (err) {
        res.status(505).json({
            status: 'error',
            message: 'Unable to retrieve all products'
        })
    }
}

export const destroyProduct = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const products = await product.destroy({where: {id : id}})

        if (!products) {
            return res.status(404).json({
                message: `product with the ${products} not found`
            })
        }
        res.status(200).json({
            message: 'product has been deleted successfully',
            status: "success",
            data: products
        })

    } catch (err) {
        console.error(err)
       res.status(500).json({
        status: 'error',
        message: 'Unable to destroy the product'
       })
    }
}

