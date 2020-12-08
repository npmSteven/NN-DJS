const { v4 } = require('uuid');
const { classifyContent } = require('../handlers/toxicityClassifier');

const { Message } = require('../models/Message');

module.exports = async (client, message) => {
    // Check if bot send a message
    if (message.author.bot || !message.reactions.message.content) return null;

    try {
        // Save message to db
        const newMesssage = await Message.create({
            id: v4(),
            guildId: message.guild.id,
            authorId: message.author.id,
            authorMessageId: message.reactions.message.id,
            channelId: message.channel.id,
            content: message.reactions.message.content,
            isEdited: true,
            createdAt: `${message.reactions.message.createdAt}`,
        });
    
        await classifyContent(newMesssage);
    } catch (error) {
        console.error('ERROR - messageUpdate.js', error);
    }
};
