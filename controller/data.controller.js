import moment from "moment-timezone"
import Data from "../model/data.model.js"
import Spot from "../model/spot.model.js"
import { Op } from "sequelize"
import Formula from "../model/formula.model.js"

export const store = async (req, res) => {
    try {
        const { flow_rate, velocity, spot_id } = req.body

        const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const data = await Data.create({
            flow_rate,
            velocity,
            spot_id,
            timestamp
        })

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const cronBSNW = async (timestamp) => {
// export const cronBSNW = async (req, res) => {
    try {
        // const { timestamp } = req.body
        const startTime = moment(timestamp).subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss')
        const endTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')

        const tlines = await Formula.findAll({
            where: {
                is_linear: false
            },
            include: [{
                model: Spot,
                as: 'spots',
                required: true,
                order: [['sort', 'ASC']],
            }]
        })

        const results = []

        for (const tline of tlines) {
            const { x_value, constant, spots } = tline
            console.log(x_value)

            if (spots.length !== 2) continue

            const mainSpot = spots.find(s => s.is_main)
            const nonMainSpot = spots.find(s => !s.is_main)

            if (!mainSpot || !nonMainSpot) continue

            // Ambil data dari masing-masing spot dalam 1 menit
            const [mainData, nonMainData] = await Promise.all([
                Data.findAll({
                    where: {
                        spot_id: mainSpot.spot_id,
                        timestamp: {
                            [Op.between]: [startTime, endTime],
                        }
                    }
                }),
                Data.findAll({
                    where: {
                        spot_id: nonMainSpot.spot_id,
                        timestamp: {
                            [Op.between]: [startTime, endTime],
                        }
                    }
                })
            ])

            const avg = arr => arr.reduce((sum, d) => sum + parseFloat(d.psi), 0) / (arr.length || 1)

            const avgMain = avg(mainData)
            const avgNonMain = avg(nonMainData)

            const x = avgMain - avgNonMain
            const bsnw = (x * x_value) + constant

            results.push({
                tline_id: tline.tline_id,
                x: x.toFixed(3),
                bsnw: bsnw.toFixed(3),
                main_spot: mainSpot.spot_id,
                non_main_spot: nonMainSpot.spot_id
            })
        }

        console.log({ timestamp, results })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}