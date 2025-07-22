import User from '../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) res.status(401).json({ message: 'Email tidak ditemukan!' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) res.status(401).json({ message: 'Password salah!' })

        const payload = {
            user_id: user.user_id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '6h' }
        )

        res.json({ user: {
            user_id: user.user_id,
            email: user.email,
            username: user.username,
            role: user.role
        }, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { user_id, email, password, username, role } = req.body

        const hashed = await bcrypt.hash(password, 10)

        let newId
        if (user_id && user_id != '') {
            newId = user_id
        } else {
            const rndmId = Math.random().toString(36).substring(2, 7).toUpperCase()
            newId = `${role}${rndmId}`
        }

        const newUser = await User.create({
            user_id: newId,
            email,
            password: hashed,
            username,
            role
        })

        res.json({ user: newUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { user_id, new_user_id, email, username, role } = req.body

        const user = await User.findOne({
            where: {
                user_id
            }
        })

        await user.update({
            user_id: new_user_id || user_id,
            email,
            username,
            role
        })

        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updatePwByAdmin = async (req, res) => {
    try {
        const { user_id, password } = req.body

        const user = await User.findOne({
            where: {
                user_id
            }
        })

        const newPw = await bcrypt.hash(password, 10)

        user.update({
            password: newPw
        })

        res.json({ message: 'Password berhasil diubah!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.body

        await User.destroy({
            where: {
                user_id
            }
        })

        res.json({ message: 'User berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        const userList = await User.findAll()

        res.json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}