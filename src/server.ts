import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"


dotenv.config()

const server: Application = express()

const PORT = process.env.PORT


server.use(express.json())

server.use(express.urlencoded({ extended: true }))

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Quad-Fold\n Best deals with the best prices',
    })
    console.log('BOOM 🔥🔥')
})

server.listen(PORT, () => {
    console.log(`Quad server is listening at http://localhost:${PORT}`)

})

export default server