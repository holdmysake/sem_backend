import Data from "../model/data.model.js"

export const store = async (req, res) => {
    try {
        const { flow_rate, sea_water, bsnw, spot_id } = req.body

        const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const data = await Data.create({
            flow_rate,
            sea_water,
            bsnw,
            spot_id,
            timestamp
        })

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}