require('dotenv').config();

// var casper = require('casper').create();

const Discord = require("discord.js");
const client = new Discord.Client(); 

let commands = require('./components/commands').commands;

client.login(process.env.DISCORD_TOKEN);

// const timeURL = "https://duckduckgo.com/?t=ffnt&q=time+in+tokyo&ia=time";

// casper.start();
// casper.open(timeURL);

// casper.then(() => {
//     console.log(this.test.assertExists('time tx-clr--slate'));
// });

// casper.arguments();

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

