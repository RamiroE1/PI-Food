const { DataTypes, UUIDV4 } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('diet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
}, {
    timestamps: false,
});
};