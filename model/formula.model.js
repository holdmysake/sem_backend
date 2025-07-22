import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Formula = sequelize.define('formula', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tline_id: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    is_linear: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    x1: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    x2: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    constant: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'formula',
    timestamps: false,
    underscored: true
})

export default Formula
