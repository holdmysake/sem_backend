const defineAssociations = models => {
    // formula -> spot
    models.Spot.belongsTo(models.Formula, {
        foreignKey: 'tline_id',
        targetKey: 'tline_id',
        as: 'formula'
    })
    models.Formula.hasMany(models.Spot, {
        foreignKey: 'tline_id',
        sourceKey: 'tline_id',
        as: 'spots'
    })

    // spot -> data
    models.Data.belongsTo(models.Spot, {
        foreignKey: 'spot_id',
        targetKey: 'spot_id',
        as: 'spot'
    })
    models.Spot.hasMany(models.Data, {
        foreignKey: 'spot_id',
        sourceKey: 'spot_id',
        as: 'data'
    })
}

export default defineAssociations