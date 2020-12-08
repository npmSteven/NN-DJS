const { DataTypes } = require('sequelize');
const { sequelize } = require('../handlers/db');

module.exports.Message = sequelize.define('message', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorMessageId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isEdited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `${new Date()}`
    }
}, { createdAt: false, updatedAt: false });
