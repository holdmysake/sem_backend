import express from 'express'
import {
    // createSpot,
    getSpots,
    upsertFormula,
    upsertSpot
} from '../controller/spot.controller.js'
import {
    verifyToken
} from '../middleware/middleware.js'

const router = express.Router()

router.post('/upsertFormula', verifyToken, upsertFormula)
router.post('/upsertSpot', verifyToken, upsertSpot)
router.post('/getSpots', verifyToken, getSpots)

export default router