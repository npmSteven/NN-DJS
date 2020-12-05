const { v4 } = require('uuid');
const toxicity = require('@tensorflow-models/toxicity');

const ToxicMessage = require('../models/ToxicMessage');
const config = require('../config');

let model = null;

const setModel = async () => {
    model = await toxicity.load(config.toxicityThreshold);
}

setModel();

module.exports.checkContent = async (message) => {
    try {
        const predictions = await classify(message.content);

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
                identityAttack: identityAttack.match || false,
                insult: insult.match  || false,
                obscene: obscene.match  || false,
                severeToxicity: severeToxicity.match  || false,
                sexualExplicit: sexualExplicit.match  || false,
                threat: threat.match  || false,
                toxicity: toxicity.match  || false,
                createdAt: message.createdAt,
            });
        }
    } catch (error) {
        console.error('ERROR - checkContent():', error);
    }
}

// Check toxicity of message
const classify = async (content) => {
    try {
        const predictions = await model.classify(content);
        return predictions;
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
};

