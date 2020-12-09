const { DataTypes } = require('sequelize');

const { sequelize } = require('../handlers/db');

module.exports.Guild = sequelize.define('guild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminGroupId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    commandChannelId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    logChannelId: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    toxicityClassifier: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { createdAt: false, updatedAt: false });
