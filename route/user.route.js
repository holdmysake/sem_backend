import express from 'express'
import {
    login,
    createUser,
    updateUser,
    updatePwByAdmin,
    deleteUser,
    getUsers
} from '../controller/user.controller.js'
import {
    verifyToken
} from '../middleware/middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/createUser', verifyToken, createUser)
router.post('/updateUser', verifyToken, updateUser)
router.post('/updatePwByAdmin', verifyToken, updatePwByAdmin)
router.post('/deleteUser', verifyToken, deleteUser)
router.post('/getUsers', verifyToken, getUsers)

export default router