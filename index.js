require('dotenv').config();

const browser = require("./components/time-scrapper");

const Discord = require("discord.js");
const client = new Discord.Client(); 

let commands = require('./components/commands').commands;


browser.launcher().then(async () => {
    // console.log(await browser.getTime("Tokyo"));
    client.login(process.env.DISCORD_TOKEN);
})

client.once("ready", () => { 
    // console.log("Ready!");
    
    // Test program
    // testProgram();
});


// On message response
client.on("message", message => {
    if(message.content[0] === '?'){
        const command = message.content.split(' ')[0].substr(1).toLowerCase();
        // Check if the map contains the command
        if (commands.has(command)) { 
            // run the command
            commands.get(command)(message);
        }
    }  
});

