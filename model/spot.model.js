import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Spot = sequelize.define('spot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    spot_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    spot_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    sort: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'spot',
    timestamps: false,
    underscored: true
})

export default Spot
