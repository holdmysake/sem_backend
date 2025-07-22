import Spot from "../model/spot.model.js"

export const createSpot = async (req, res) => {
    try {
        const t = await sequelize.transaction()
        const { spot_id, spot_name, sort, is_seen } = req.body
        const totalSpots = await Spot.count()

        if (!sort || sort > totalSpots) {
            sort = totalSpots + 1
        } else {
            await Spot.increment(
                { sort: 1 },
                {
                    where: { sort: { [Op.gte]: sort } },
                    transaction: t,
                }
            )
        }

        const spot = await Spot.create(
            {
                spot_id,
                spot_name,
                sort,
                is_seen
            },
            { transaction: t }
        )

        await t.commit()
        res.json(spot)
    } catch (error) {
        await t.rollback()
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