import express from 'express'
import {
    store,
    cronBSNW
} from '../controller/data.controller.js'

const router = express.Router()

router.post('/store', store)
router.post('/store', cronBSNW)

export default router