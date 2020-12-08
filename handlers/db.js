const { Sequelize } = require('sequelize');

const { db } = require('../config');

const options = {
    logging: false,
}

let sequelize = null;
if (db.type === 'mysql') {
    sequelize = new Sequelize(db.url, options);
} else if (db.type === 'sqlite') {
    sequelize = new Sequelize({
        ...options,
        dialect: 'sqlite',
        storage: './database/db.sqlite',
    });
}

module.exports.sequelize = sequelize;

module.exports.connectDb = () => sequelize.authenticate();

const { Message } = require('../models/Message');
const { ToxicMessage } = require('../models/ToxicMessage');
const { Guild } = require('../models/Guild');
const { ToxicUser } = require('../models/ToxicUser');
const { ToxicityClassifier } = require('../models/ToxicityClassifier');

module.exports.syncDb = async () => {
    try {
        await Message.sync();
        await ToxicMessage.sync();
        await Guild.sync();
        await ToxicUser.sync();
        await ToxicityClassifier.sync();
    } catch (error) {
        console.error('ERROR - syncDb():', error);
    }
}
