const { v4 } = require('uuid');

const { Message } = require('../models/Message');
const { classifyContent } = require('../handlers/toxicityClassifier');

module.exports = async (client, message) => {
    // Check if bot send a message
    if (message.author.bot || !message.content) return null;
    try {
        // Save message to db
        const newMesssage = await Message.create({
            id: v4(),
            guildId: message.guild.id,
            authorId: message.author.id,
            authorMessageId: message.id,
            channelId: message.channel.id,
            content: message.content,
            isEdited: false,
        });
    
        await classifyContent(newMesssage);
    } catch (error) {
        console.error('ERROR - message.js', error);
    }
};
