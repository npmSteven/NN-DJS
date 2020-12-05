require('dotenv').config();

module.exports = {
    discord: {
        token: process.env.DISCORD_TOKEN,
    },
    toxicityThreshold: 0.2,
};
