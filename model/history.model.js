import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Data from './data.model.js'

const History = sequelize.define('history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Data,
            key: 'data_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    suggestion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'history',
    timestamps: false,
    underscored: true
})

export default History
