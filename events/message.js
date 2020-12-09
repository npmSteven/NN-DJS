const { Message } = require('../models/Message');
const { classifyContent } = require('../handlers/toxicityClassifier');
const { v4 } = require('uuid');
const { Guild } = require('../models/Guild');

module.exports = async (client, userMessage) => {
    // Check if bot send a message
    if (userMessage.author.bot || !userMessage.content) return null;

    try {
        const guild = await Guild.findOne({ where: { guildId: userMessage.guild.id } });
        if (!guild) return null;

        // Save message to db
        const newMesssage = await Message.create({
            id: v4(),
            guildId: userMessage.guild.id,
            authorId: userMessage.author.id,
            authorMessageId: userMessage.id,
            channelId: userMessage.channel.id,
            content: userMessage.content,
            createdAt: `${new Date()}`,
        });
    
        await classifyContent(newMesssage, userMessage);
    } catch (error) {
        console.error('ERROR - message.js', error);
    }
};
