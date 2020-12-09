const { DataTypes } = require('sequelize');

const { sequelize } = require('../handlers/db');

module.exports.ToxicUser = sequelize.define('toxicUser', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identityAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    insult: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    obscene: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    severeToxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    sexualExplicit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    threat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    toxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });
