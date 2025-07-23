import moment from "moment-timezone"
import Data from "../model/data.model.js"
import Spot from "../model/spot.model.js"
import { Op } from "sequelize"

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
    try {
        console.log(`tes cron ${timestamp}`)
        const startTime = moment(timestamp).subtract(1, 'minute').format('YYYY-MM-DD HH:mm')

        const spots = await Spot.findAll({
            order: [['tline_id', 'ASC'], ['sort', 'ASC']],
        })

        const grouped = {}

        for (const spot of spots) {
            const tlineId = spot.tline_id
            if (!grouped[tlineId]) grouped[tlineId] = []

            const data = await Data.findAll({
                where: {
                    spot_id: spot.spot_id,
                    timestamp: {
                        [Op.between]: [startTime, timestamp],
                    },
                },
                order: [['timestamp', 'DESC']],
            })

            grouped[tlineId].push({
                ...spot.toJSON(),
                data: data,
            })
        }
        // console.log(grouped)
    } catch (error) {
        console.error(error)
    }
}