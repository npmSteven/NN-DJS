const { v4 } = require('uuid');
const { classifyContent } = require('../handlers/toxicityClassifier');
const { Guild } = require('../models/Guild');

const { Message } = require('../models/Message');

module.exports = async (client, userMessage) => {
    // Check if bot send a message
    if (userMessage.author.bot || !userMessage.reactions.message.content) return null;

    try {
        const guild = await Guild.findOne({ where: { guildId: userMessage.guild.id } });
        if (!guild) return null;

        // Save message to db
        const newMesssage = await Message.create({
            id: v4(),
            guildId: userMessage.guild.id,
            authorId: userMessage.author.id,
            authorMessageId: userMessage.reactions.message.id,
            channelId: userMessage.channel.id,
            content: userMessage.reactions.message.content,
            isEdited: true,
            createdAt: `${new Date()}`,
        });
    
        await classifyContent(newMesssage, userMessage);
    } catch (error) {
        console.error('ERROR - messageUpdate.js', error);
    }
};
