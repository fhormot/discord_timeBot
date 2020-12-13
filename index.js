require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client(); 

// import { commands } from './components/commands';
let commands = require('./components/commands').commands;

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => { 
    // console.log("Ready!");
    
    // Test program
    // console.log("Starting test.");
    // client.emit("message", {content: "?time Tokyo"});
});


// On message response
client.on("message", message => {
    if(message.content[0] === '?'){
        const command = message.content.split(' ')[0].substr(1);
        // Check if the map contains the command
        if (commands.has(command)) { 
            // run the command
            commands.get(command)(message);
        }
    }  
});

