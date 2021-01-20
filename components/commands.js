const Discord = require("discord.js");

const axios = require('axios').default;
const time_API_url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY}&tz=`;

const giphy = require('giphy')(process.env.GIPHY_API_KEY);

let commands = new Map();               // Map of commands
const resp_num = 20;                    // Giphy result limiter

const {
    extractArgument,
    map2list,
    msgEmbed,
} = require('./helper-functions');

commands.set("help", (msg) => {
    const resp_help = new Discord.MessageEmbed()
        .setTitle('Let me help you better use me!')
        .setDescription('Use \'?\' to address me. The following commands are available:')
        .addFields(
            { name: 'help', value: 'Prints this help dialog' },
            { name: 'time (city)', value: 'Returns the current time in the given city (eg. ?time Tokyo will return the current time in Tokyo)' },
            { name: 'gj (mention)', value: 'Congratulate yourself on a good job. Or mention somebody else.' }
        );

    msg.channel.send(resp_help);
});

commands.set("time", (msg) => {
    const requestCity = extractArgument(msg);

    axios.get(`${time_API_url}Asia/Tokyo`)
        .then((response) => {
            let msg_response = `I don't know what '${requestCity}' is, but the current time in Tokyo is ${response.data.time_12}`;

            if(!requestCity) {
                msg_response = `You haven't specified a city, but the current time in Tokyo is ${response.data.time_12}`;
            } else if(requestCity.toLowerCase() === 'tokyo') {
                msg_response = `Current time in Tokyo is ${response.data.time_12}`;
            }

            msg.channel.send(msg_response)
        })
        .catch((response) => {
            msg.channel.send(`Something went wrong. x_x`);
        })
});

commands.set("gj", (msg) => {
    const args = extractArgument(msg);      // Extract arguments from the message

    giphy.search({q: "Good Job", limit: resp_num}, (err, resp) => {
        if(!err){
            const author = msg.author;

            // console.log(msg);
            let mentionList = map2list(msg.mentions.users);

            // Pull of a gif
            const resp_gif = resp.data[Math.floor(Math.random()*resp_num)].images.original.url;

            let resp_msg = `${author} wants to say good job to`;
            
            if (mentionList.length === 0) {
                // No arguments given
                resp_msg += "... himself?";
            } else if (mentionList.length === 1){
                // A single argument is given
                // Check if author == argument
                if(mentionList[0].id === author.id){
                    resp_msg += "... himself?";
                } else {
                    resp_msg += ` ${mentionList[0]}`;
                }
            } else {
                // A list of mentions is provided
                for(let idx = 0; idx < mentionList.length - 1; idx++){
                    resp_msg += ` ${mentionList[idx]}`;
                }
                resp_msg += ` and ${mentionList[mentionList.length-1]}.`
            }

            msg.channel.send(msgEmbed(resp_msg, resp_gif));
        } else {
            msg.channel.send(`Something went wrong. x_x`);
        }
    })
})

module.exports = { commands };