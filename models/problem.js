module.exports = (sequelize, DataTypes) => (
    sequelize.define('problem', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER.UNSIGNED,
            default: 0,
        },
        flag: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        problemID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING(1024),
            allowNull: true,
        }

    }, {
        timestamps: false,
        paranoid: false,
    })
);