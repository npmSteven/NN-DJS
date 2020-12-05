const { DataTypes } = require('sequelize');
const { sequelize } = require('../handlers/db');

module.exports = sequelize.define('message', {
    id: {
        type: DataTypes.UUIDV4,
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
    }
}, { createdAt: false, updatedAt: false });
