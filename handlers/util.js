module.exports.readMessagesFromGuild = async (client, guildId) => {
    try {
        const guild = await client.guilds.fetch(guildId);
        const guildChannels = guild.channels.cache.filter(({ type }) => type === 'text');
        const guildChannelIds = guildChannels.map(({ id }) => id);
        await guildChannelIds.forEach(async channelId => {
            const channel = await client.channels.cache.get(channelId);
            await channel.messages.fetch({ limit: 100 });
        });
    } catch (error) {
        console.error('ERROR - readMessagesForMessageUpdate()', error);
    }
}

/**
* Calls multiple promises in parallel
* Returns object of resolved promises
*/
module.exports.parallelAsync = async (parallelRequests) => {
 const resolvedRequests = await Promise.all(Object.values(parallelRequests));
 const requestKeys = Object.keys(parallelRequests);
 return resolvedRequests.reduce(
   (acc, hR, index) => {
     acc[requestKeys[index]] = hR;
     return acc;
   },
   {},
 );
};