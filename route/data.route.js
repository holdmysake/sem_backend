import express from 'express'
import {
    store,
    // cronBSNW,
    getData
} from '../controller/data.controller.js'

const router = express.Router()

router.post('/store', store)
// router.post('/cronBSNW', cronBSNW)
router.post('/getData', getData)

export default router