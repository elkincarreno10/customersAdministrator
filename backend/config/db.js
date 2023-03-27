import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME ?? ''
const dbUser = process.env.DB_USER ?? ''
const dbPassword = process.env.DB_PASSWORD ?? ''
const dbHost = process.env.DB_HOST ?? ''

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    timezone: '-05:00'
})

export default db


