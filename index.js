require('dotenv').config();

const Discord = require("discord.js");
const axios = require('axios').default;
const axios_url = 'http://api.timezonedb.com/v2.1/get-time-zone';

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
    const requestCity = extractArgument(msg);

    axios.get(`${axios_url}/geo/cities/68526/time`)
        .then((response) => {
            // msg.channel.send(response);
            console.log(response);
        })
        .catch((response) => {
            // msg.channel.send(response);
            console.log(response);
        })
})