const { readMessagesFromGuild } = require('../handlers/util');

module.exports = async (client) => {
    // Get all guilds
    const guildIds = client.guilds.cache.map(({ id }) => id);
    try {
        await Promise.all(guildIds.map(guildId => readMessagesFromGuild(client, guildId)));
        console.log(`${client.user.username} is ready!`);
    } catch (error) {
        console.error('ERROR - ready.js', error);
    }
};
