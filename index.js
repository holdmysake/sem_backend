import express from 'express'
import sequelize from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { models } from './model/index.js'
import defineAssociations from './model/association.js'

import userRoute from './route/user.route.js'
import spotRoute from './route/spot.route.js'
import dataRoute from './route/data.route.js'

import './cron/tes.cron.js'

dotenv.config()
defineAssociations(models)

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/', spotRoute)
app.use('/api/', userRoute)
app.use('/api/', dataRoute)

const PORT = process.env.PORT

sequelize.sync({ force: false })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database error:', err))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} oke`)
})