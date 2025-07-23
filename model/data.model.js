import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Spot from './spot.model.js'
import moment from 'moment-timezone'

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
    velocity: {
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
