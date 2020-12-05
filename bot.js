const Discord = require('discord.js');
const fs = require('fs').promises;
const Enmap = require('enmap');
require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const { connectDb, syncDb } = require('./handlers/db');
const { discord } = require('./config');

// init client
const client = new Discord.Client();

const init = async () => {
    try {

        // Connect to db
        await connectDb();

        // Sync databaes
        await syncDb();

        // Init event hanlder
        await checkEvents();

        // init command handler

        // login discord bot
        client.login(discord.token);
    } catch (error) {
        console.error('ERROR - init():', error);
        process.exit(1);
    }
}

const checkEvents = async () => {
    const eventsFolder = './events';
    try {
        const eventFiles = await fs.readdir(eventsFolder);
        eventFiles.forEach(eventFile => {
            const event = require(`${eventsFolder}/${eventFile}`);
            const eventName = eventFile.split('.')[0];
            console.log(`Event - loaded: ${eventName}`);
            client.on(eventName, event.bind(null, client));
        });
        // Commands - Read commands folder for all of the available commands
        client.commands = new Enmap();
    } catch (error) {
        console.error('ERROR - checkEvents():', error);
        process.exit(1);
    }
}

init();
