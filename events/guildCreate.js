const { v4 } = require('uuid');
const { readMessagesFromGuild } = require('../handlers/util');
const { Guild } = require('../models/Guild');
const { ToxicityClassifier } = require('../models/ToxicityClassifier');

module.exports = async (client, guild) => {
    try {

        await createTablesForSettings(guild.id);

        await readMessagesFromGuild(client, guild.id);
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
            createdAt: `${new Date()}`,
        });
    
        const foundToxicityClassifier = await ToxicityClassifier.findOne({ where: { guildId } });
    
        // Check if already exists
        if (foundToxicityClassifier) return null;
    
        await ToxicityClassifier.create({
            id: v4(),
            guildId,
            createdAt: `${new Date()}`,
        });
    } catch (error) {
        console.error('ERROR - createTablesForSettings()', error);
    }
}
