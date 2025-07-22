import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Spot from './spot.model.js'
import moment from 'moment-timezone'

const BSNW = sequelize.define('bsnw', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bsnw: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    spot_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
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
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    suggestion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'bsnw',
    timestamps: false,
    underscored: true
})

export default BSNW
