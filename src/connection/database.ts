import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string
const sequelize = new Sequelize(POSTGRES_URL)

async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log('✅ Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export { connectDB, sequelize, Sequelize, DataTypes }
