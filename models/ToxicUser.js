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
    },
    insult: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    obscene: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    severeToxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexualExplicit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    threat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    toxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });
