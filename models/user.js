module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        num: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true,
        },
        id: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true,
            validate: {
                isAlphanumeric: true,
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        score: {
            type: DataTypes.INTEGER.UNSIGNED,
            default: 0,
        },
    }, {
        timestamps: false,
        paranoid: false,
    })
);