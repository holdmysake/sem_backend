import Spot from "../model/spot.model.js"

export const createSpot = async (req, res) => {
    try {
        const { spot_id, spot_name, sort, is_seen } = req.body

        const spot = await Spot.create({
            spot_id,
            spot_name,
            sort,
            is_seen
        })

        res.json(spot)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const getSpots = async (req, res) => {
    try {
        const spots = await Spot.findAll({
            order: [['sort', 'ASC']]
        })

        res.json(spots)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}