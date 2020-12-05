const { DataTypes } = require('sequelize');
const { sequelize } = require('../handlers/db');

const ToxicMessage = sequelize.define('toxicMessage', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    messageId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identityAttack: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    insult: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    obscene: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    severeToxicity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sexualExplicit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    threat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    toxicity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });

module.exports = ToxicMessage;
