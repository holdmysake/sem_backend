import { Sequelize } from "sequelize"
import Formula from "../model/formula.model.js"
import Spot from "../model/spot.model.js"

export const upsertFormula = async (req, res) => {
    try {
        const { id, tline_id, is_linear, x1, x2, constant } = req.body

        let formula

        if (id) {
            formula = await Formula.findByPk(id)
            if (!formula) {
                return res.status(404).json({ message: 'Formula tidak ditemukan' })
            }

            await formula.update({ tline_id, is_linear, x1, x2, constant })
        } else {
            formula = await Formula.create({ tline_id, is_linear, x1, x2, constant })
        }

        res.json(formula)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

// export const createSpot = async (req, res) => {
//     try {
//         const t = await sequelize.transaction()
//         const { spot_id, spot_name, tline_id, is_main, sort, is_seen } = req.body
//         const totalSpots = await Spot.count()

//         if (!sort || sort > totalSpots) {
//             sort = totalSpots + 1
//         } else {
//             await Spot.increment(
//                 { sort: 1 },
//                 {
//                     where: { sort: { [Op.gte]: sort } },
//                     transaction: t,
//                 }
//             )
//         }

//         const spot = await Spot.create(
//             {
//                 spot_id,
//                 spot_name,
//                 tline_id,
//                 is_main,
//                 sort,
//                 is_seen
//             },
//             { transaction: t }
//         )

//         await t.commit()
//         res.json(spot)
//     } catch (error) {
//         await t.rollback()
//         console.error(error)
//         res.status(500).json({ message: error.message })
//     }
// }

export const upsertSpot = async (req, res) => {
    const t = await Sequelize.transaction()
    try {
        let { id, spot_id, spot_name, tline_id, is_main, sort, is_seen } = req.body

        let spot

        if (id) {
            // Update existing spot
            spot = await Spot.findByPk(id)
            if (!spot) {
                await t.rollback()
                return res.status(404).json({ message: 'Spot tidak ditemukan' })
            }

            await spot.update({ spot_id, spot_name, tline_id, is_main, sort, is_seen }, { transaction: t })
        } else {
            // Create new spot
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

            spot = await Spot.create(
                {
                    spot_id,
                    spot_name,
                    tline_id,
                    is_main,
                    sort,
                    is_seen
                },
                { transaction: t }
            )
        }

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

        const formulas = await Formula.findAll()

        res.json({
            spots,
            formulas
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}