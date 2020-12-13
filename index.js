const Discord = require("discord.js");
const fs = require("fs"); 

const client = new Discord.Client(); 
const token = fs.readFileSync("token.txt").toString(); 

client.once("ready", () => { 
	console.log("Ready!");
});

client.on("message", message => {
    if(message.content === '?time'){
        console.log(msg)
    }
});

client.login(token);