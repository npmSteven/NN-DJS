require('dotenv').config();

module.exports = {
    discord: {
        token: process.env.DISCORD_TOKEN,
    },
    db: {
        type: process.env.DB_TYPE,
        url: process.env.DB_URL,
    },
};
