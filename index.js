require('dotenv').config();

const Discord = require("discord.js");

const axios = require('axios').default;
const time_API_url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY}&tz=`;

const client = new Discord.Client(); 

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => { 
	console.log("Ready!");
});

client.on("message", message => {
    if(message.content[0] === '?'){
        const command = message.content.split(' ')[0].substr(1);
        // Check if the map contains the command
        if (commands.has(command)) { 
            // run the command
            commands.get(command)(message)
        }
    }  
});

function extractArgument(msg) {
    const str = msg.content.split(' ')[1];
    if (str) {
        return str.toLowerCase();
    } else {
        return '';
    }
}
    
let commands = new Map();

commands.set("time", (msg) => {
    const requestCity = extractArgument(msg);

    axios.get(`${time_API_url}Asia/Tokyo`)
        .then((response) => {
            if(!requestCity) {
                msg.channel.send(`You haven't specified a city but the current time in Tokyo is ${response.data.time_12}`);
            } else if(requestCity === 'tokyo') {
                msg.channel.send(`Current time in Tokyo is ${response.data.time_12}`);
            } else {
                msg.channel.send(`I don't know what '${requestCity}' is, but the current time in Tokyo is ${response.data.time_12}`);
            }
        })
        .catch((response) => {
            msg.channel.send(`Something went wrong. x_x`);
        })
});