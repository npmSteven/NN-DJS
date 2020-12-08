const { DataTypes } = require('sequelize');
const { sequelize } = require('../handlers/db');

module.exports.ToxicMessage = sequelize.define('toxicMessage', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    messageId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identityAttack: {
        type: DataTypes.BOOLEAN,
    },
    insult: {
        type: DataTypes.BOOLEAN,
    },
    obscene: {
        type: DataTypes.BOOLEAN,
    },
    severeToxicity: {
        type: DataTypes.BOOLEAN,
    },
    sexualExplicit: {
        type: DataTypes.BOOLEAN,
    },
    threat: {
        type: DataTypes.BOOLEAN,
    },
    toxicity: {
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });
