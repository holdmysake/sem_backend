import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Spot from './spot.model.js'

const Data = sequelize.define('data', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    flow_rate: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    sea_water: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    bsnw: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    spot_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        references: {
            model: Spot,
            key: 'spot_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const raw = this.getDataValue('timestamp')
            return raw ? moment(raw).format('YYYY-MM-DD HH:mm:ss') : null
        }
    }
}, {
    tableName: 'data',
    timestamps: false,
    underscored: true
})

export default Data
