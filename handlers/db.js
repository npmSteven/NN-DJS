const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite',
    logging: false,
});

module.exports.sequelize = sequelize;

module.exports.connectDb = () => sequelize.authenticate();

const Message = require('../models/Message');
const ToxicMessage = require('../models/ToxicMessage');

module.exports.syncDb = async () => {
    try {
        await Message.sync();
        await ToxicMessage.sync();
    } catch (error) {
        console.error('ERROR - syncDb():', error);
    }
}
