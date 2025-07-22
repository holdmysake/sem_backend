import express from 'express'
import {
    createSpot
} from '../controller/spot.controller.js'
import {
    verifyToken
} from '../middleware/middleware.js'

const router = express.Router()

router.post('/createSpot', verifyToken, createSpot)

export default router