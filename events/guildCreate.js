const { v4 } = require('uuid');

const { Guild } = require('../models/Guild');
const { ToxicityClassifier } = require('../models/ToxicityClassifier');

module.exports = async (client, guild) => {
    try {

        await createTablesForSettings(guild.id);

        await readMessagesForMessageUpdate(client, guild.id);
        console.log('read messages');

    } catch (error) {
        console.error('ERROR - guildCreate.js', error);
    }
};

const createTablesForSettings = async (guildId) => {
    try {
        const foundGuild = await Guild.findOne({ where: { guildId } });
            
        // Check if already exists
        if (foundGuild) return null;
    
        await Guild.create({
            id: v4(),
            guildId,
        });
    
        const foundToxicityClassifier = await ToxicityClassifier.findOne({ where: { guildId } });
    
        // Check if already exists
        if (foundToxicityClassifier) return null;
    
        await ToxicityClassifier.create({
            id: v4(),
            guildId,
        });
    } catch (error) {
        console.error('ERROR - createTablesForSettings()', error);
    }
}
