module.exports = async (client) => {
    // Get all guilds
    const guildIds = client.guilds.cache.map(({ id }) => id);
    try {
        // Get channelIds
        const channelIdsPromise = await guildIds.reduce(async (acc, guildId) => {
            const guild = await client.guilds.fetch(guildId);
            const guildChannels = guild.channels.cache.filter(({ type }) => type === 'text');
            const guildChannelIds = guildChannels.map(({ id }) => id);
            acc.push(...guildChannelIds);
            return acc;
        }, []);
        const channelIds = await channelIdsPromise;
        await channelIds.forEach(async channelId => {
            const channel = await client.channels.cache.get(channelId);
            await channel.messages.fetch();
        });
        
        console.log(`${client.user.username} is ready!`);
    } catch (error) {
        console.error('ERROR - ready.js', error);
    }
};
