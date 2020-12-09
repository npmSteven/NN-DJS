const toxicityModel = require('@tensorflow-models/toxicity');

const { ToxicMessage } = require('../models/ToxicMessage');
const { Guild } = require('../models/Guild');
const { classifyMessageAction } = require('./toxicityClassifierActions');
const { v4 } = require('uuid');

module.exports.classifyContent = async (message, userMessage) => {
    try {
        const guild = await Guild.findOne({ where: { guildId: userMessage.guild.id } });
        if (!guild) return null;
        
        const model = await toxicityModel.load(guild.toxicityThreshold);
        const predictions = await model.classify(message.content);

        const identityAttack = predictions.find(({ label }) => label === 'identity_attack').results[0];
        const insult = predictions.find(({ label }) => label === 'insult').results[0];
        const obscene = predictions.find(({ label }) => label === 'obscene').results[0];
        const severeToxicity = predictions.find(({ label }) => label === 'severe_toxicity').results[0];
        const sexualExplicit = predictions.find(({ label }) => label === 'sexual_explicit').results[0];
        const threat = predictions.find(({ label }) => label === 'threat').results[0];
        const toxicity = predictions.find(({ label }) => label === 'toxicity').results[0];
    
        if (
            identityAttack.match ||
            insult.match ||
            obscene.match ||
            severeToxicity.match ||
            identityAttack.match ||
            sexualExplicit.match ||
            threat.match ||
            toxicity.match
        ) {
            await ToxicMessage.create({
                id: v4(),
                messageId: message.id,
                identityAttack: identityAttack.match,
                insult: insult.match,
                obscene: obscene.match,
                severeToxicity: severeToxicity.match,
                sexualExplicit: sexualExplicit.match,
                threat: threat.match,
                toxicity: toxicity.match,
                createdAt: `${new Date()}`,
            });

            await classifyMessageAction(userMessage);
        }
    } catch (error) {
        console.error('ERROR - checkContent():', error);
    }
}
