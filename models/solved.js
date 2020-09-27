module.exports = (sequelize, DataTypes) => (
    sequelize.define('solved', {
        problemID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        userID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        timestamps: false,
        paranoid: false,
    })
);
