const { DataTypes } = require('sequelize');

const { sequelize } = require('../handlers/db');

module.exports.ToxicityClassifier = sequelize.define('toxicityClassifier', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    toxicityThreshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.5
    },
    identityAttackEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    identityAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    identityAttackAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    insultEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    insult: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    insultAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    obsceneEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    obscene: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    obsceneAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    severeToxicityEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    severeToxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    severeToxicityAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    sexualExplicitEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    sexualExplicit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    sexualExplicitAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    threatEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    threat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    threatAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    toxicityEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    toxicity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    toxicityAction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ban',
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });
