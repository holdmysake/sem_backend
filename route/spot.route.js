import express from 'express'
import {
    createSpot,
    getSpots
} from '../controller/spot.controller.js'
import {
    verifyToken
} from '../middleware/middleware.js'

const router = express.Router()

router.post('/createSpot', verifyToken, createSpot)
router.post('/getSpots', verifyToken, getSpots)

export default router