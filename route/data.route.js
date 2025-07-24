import express from 'express'
import {
    store,
    // cronBSNW,
    getData
} from '../controller/data.controller.js'
import {
    verifyToken
} from '../middleware/middleware.js'

const router = express.Router()

router.post('/store', store)
// router.post('/cronBSNW', cronBSNW)
router.post('/getData', verifyToken, getData)

export default router