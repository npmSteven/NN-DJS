const { ToxicityClassifier } = require('../models/ToxicityClassifier');
const { Guild } = require('../models/Guild');
const { ToxicUser } = require('../models/ToxicUser');
const { v4 } = require('uuid');

module.exports.classifyMessageAction = async userMessage => {
    const guildId = userMessage.guild.id;
    try {
        // NOTE: if the guild doesn't exist then there was an issue with guildCreate event
        const guild = await Guild.findOne({ where: { guildId } });
    
        // Check if the guild has enabled toxicityClassifier module
        if ((guild || {}).toxicityClassifier) {
            const toxicityClassifier = await ToxicityClassifier.findOne({ where: { guildId } });

            // NOTE: if the toxicityClassifier doesn't exist then there was an issue with guildCreate event
            if (!toxicityClassifier) return null;

            // Check at least one of the toxicityClassifiers are enabled
            if (
                toxicityClassifier.identityAttackEnabled ||
                toxicityClassifier.insultEnabled ||
                toxicityClassifier.obsceneEnabled ||
                toxicityClassifier.severeToxicityEnabled ||
                toxicityClassifier.sexualExplicitEnabled ||
                toxicityClassifier.threatEnabled ||
                toxicityClassifier.toxicityEnabled
            ) {
                const toxicUser = await getToxicUser(guildId, userMessage.author.id);
                await Promise.all([
                    classifyAction(toxicityClassifier, toxicUser, 'identityAttackEnabled', 'identityAttack', 'identityAttackAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'insultEnabled', 'insult', 'insultAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'obsceneEnabled', 'obscene', 'obsceneAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'severeToxicityEnabled', 'severeToxicity', 'severeToxicityAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'sexualExplicitEnabled', 'sexualExplicit', 'sexualExplicitAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'threatEnabled', 'threat', 'threatAction'),
                    classifyAction(toxicityClassifier, toxicUser, 'toxicityEnabled', 'toxicity', 'toxicityAction'),
                ]);
            }
        }
    } catch (error) {
        console.error('ERROR - toxicityClassifierActions.js - classifyMessageAction():', error);
    }
}

const classifyAction = async (toxicityClassifier, toxicUser, enabled, classifer, action) => {
    if (toxicityClassifier[enabled]) {
        const updatedToxicUser = await toxicUser.update({
            [classifer]: toxicUser[classifer] += 1,
        });
        if (updatedToxicUser[classifer] >= toxicityClassifier[classifer]) {
            console.log(toxicityClassifier[action]);
        }
    }
}

const getToxicUser = async (guildId, userId) => {
    try {
        const toxicUser = await ToxicUser.findOne({ where: { guildId, userId } });
        if (toxicUser) {
            return toxicUser;
        }
        return ToxicUser.create({
            id: v4(),
            guildId,
            userId,
            createdAt: `${new Date()}`,
        });
    } catch (error) {
        console.error('ERROR - getToxicUser():', error);
    }
}

