module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        userID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        id: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
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