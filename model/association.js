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
}

export default defineAssociations