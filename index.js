import express from 'express'
import sequelize from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

sequelize.sync({ force: false })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database error:', err))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})