const Discord = require("discord.js");

const axios = require('axios').default;
const time_API_url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY}&tz=`;

const giphy = require('giphy')(process.env.GIPHY_API_KEY);

let commands = new Map();

function extractArgument(msg) {
    const str = msg.content.split(' ').slice(1).join(" ");

    return (str) ? str : "";
}

function msgEmbed(msg, gif) {
    return new Discord.MessageEmbed()
        .setDescription(`${msg}`)
        .setImage(gif);
    // return { embed: {
    //     color: 0x0099ff,
    //     description: `${msg}`,
    //     image: {
    //         url: `${gif}`
    //     }
    // }}
}

commands.set("help", (msg) => {
    msg.channel.send(
        `Use '?' to address the bot. The following commands are available:
        \t- help
            \t\t prints this help dialog.
        \t- time (city)
            \t\t Returns the current time in the given city (eg. ?time Tokyo will return the current time in Tokyo).
        \t- gj
            \t\t Congratulate yourself on a good job. Or mention somebody else.`
    );
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
    const args = extractArgument(msg);
    const resp_num = 20;

    giphy.search({q: "Good Job", limit: resp_num}, (err, resp) => {
        if(!err){
            const author = msg.author;
            const mentionMap = msg.mentions.users;

            let mentionList = [];

            for (var entry of mentionMap.entries()){
                mentionList.push(entry[1]);
            }

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