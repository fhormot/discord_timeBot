require('dotenv').config();

const Discord = require("discord.js");
const axios = require('axios').default;
const time_API_url = "";

const client = new Discord.Client(); 

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => { 
	console.log("Ready!");
});

client.on("message", message => {
    if(message.content[0] === '?'){
        const command = message.content.split(' ')[0].substr(1);
        if (commands.has(command)) { // checks if the map contains the command
            commands.get(command)(message) // runs the command
        }
    }  
});

function extractArgument(msg) {
    return msg.content.split(' ')[1];
}
    
let commands = new Map();

commands.set("time", (msg) => {
    // msg.channel.send(extractArgument(msg));
    // const requestCity = extractArgument(msg);
    msg.channel.send("It is some time in Tokyo!");

    // axios.get(`${time_API_url}`)
    //     .then((response) => {
    //         // msg.channel.send(response);
    //         console.log(response);
    //     })
    //     .catch((response) => {
    //         // msg.channel.send(response);
    //         console.log(response);
    //     })
});

commands.set("represent", (msg) => {
    msg.channel.send("-play plastic love");
    msg.channel.send("-play stay with me miki");
});