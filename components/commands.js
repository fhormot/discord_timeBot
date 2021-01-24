const Discord = require("discord.js");

const axios = require('axios').default;
const time_API_url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY}&tz=`;

let commands = new Map();                           // Map of commands
const resp_num = process.env.TENOR_SEARCH_SCOPE;    // Gif result limiter => used in combination with rand generator

const {
    extractArgument,
    errMsg,
    footerMsg,
    map2list,
    msgEmbed,
    randIndex,
    randQuery,
    tenorSearch
} = require('./helper-functions');

commands.set("help", (msg) => {
    const resp_help = new Discord.MessageEmbed()
        .setTitle('Let me help you better use me!')
        .setDescription('Use \'?\' to address me. The following commands are available:')
        .addFields(
            { 
                name: 'help', 
                value: 'Prints this help dialog' 
            },
            { 
                name: 'time (city)', 
                value: 'Returns the current time in the given city (eg. ?time Tokyo will return the current time in Tokyo)' 
            },
            { 
                name: 'gj (mention)', 
                value: 'Congratulate yourself on a good job. Or mention somebody else.' 
            },
            { 
                name: 'ganbatte (mention)', 
                value: 'Ganbatte! Do it for yourself or mention somebody else.' 
            },
            {
                name: 'wtf (mention)',
                value: "WTF?"
            },
            {
                name: 'slap (mention)',
                value: 'Slap somebody for being a baka.'
            },
            {
                name: 'ecchi (mention)',
                value: 'Proclaim yourself or somebody else a pervert.'
            }
        )
        .setFooter(footerMsg);

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
    const author = msg.author;
    let mentionList = map2list(msg.mentions.users);

    const query_select = randQuery([
        "good+job",
        "good+job+anime",
        "great+work",
        "success"
    ]);

    tenorSearch(query_select, randIndex(resp_num), 
        (resp) => {
            // Pull of a gif
            const resp_gif = resp[0].media[0].gif.url;

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
        }, 
        (err) => {
            // console.log(err);
            msg.channel.send(errMsg);
        }
    );
});

commands.set("ganbatte", (msg) => {
    const args = extractArgument(msg);      // Extract arguments from the message
    const author = msg.author;
    let mentionList = map2list(msg.mentions.users);

    const query_select = randQuery([
        "do+your+best",
        "hang+in+there",
        "you+can+do+it",
        "ganbatte"
    ]);

    tenorSearch(query_select, randIndex(resp_num), 
        (resp) => {
            // Pull of a gif
            const resp_gif = resp[0].media[0].gif.url;

            let resp_msg = "";
            
            if (mentionList.length === 0) {
                // No arguments given
                resp_msg += `${author}, ganbatte!`;
            } else if (mentionList.length === 1){
                // A single argument is given
                // Check if author == argument
                if(mentionList[0].id === author.id){
                    resp_msg += `${author}, ganbatte!`;
                } else {
                    resp_msg += `${mentionList[0]}, ganbatte!`;
                }
            } else {
                // A list of mentions is provided
                for(let idx = 0; idx < mentionList.length - 1; idx++){
                    resp_msg += ` ${mentionList[idx]}`;
                }
                resp_msg += ` and ${mentionList[mentionList.length-1]}, ganbatte!`
            }

            msg.channel.send(msgEmbed(resp_msg, resp_gif));
        }, 
        (err) => {
            // console.log(err);
            msg.channel.send(errMsg);
        }
    );
});

commands.set("wtf", (msg) => {
    const args = extractArgument(msg);      // Extract arguments from the message
    const author = msg.author;
    let mentionList = map2list(msg.mentions.users);

    const query_select = randQuery([
        "wtf",
        "what+the+fuck"
    ]);

    tenorSearch(query_select, randIndex(resp_num), 
        (resp) => {
            // Pull of a gif
            const resp_gif = resp[0].media[0].gif.url;

            let resp_msg = "";
            
            if (mentionList.length === 0) {
                // No arguments given
                resp_msg += `${author}, WTF?!`;
            } else if (mentionList.length === 1){
                // A single argument is given
                // Check if author == argument
                if(mentionList[0].id === author.id){
                    resp_msg += `${author}, WTF?!`;
                } else {
                    resp_msg += `${mentionList[0]}, WTF?!`;
                }
            } else {
                // A list of mentions is provided
                for(let idx = 0; idx < mentionList.length - 1; idx++){
                    resp_msg += ` ${mentionList[idx]}`;
                }
                resp_msg += ` and ${mentionList[mentionList.length-1]}, WTF?!`
            }

            msg.channel.send(msgEmbed(resp_msg, resp_gif));
        }, 
        (err) => {
            // console.log(err);
            msg.channel.send(errMsg);
        }
    );
});

commands.set("slap", (msg) => {
    const args = extractArgument(msg);      // Extract arguments from the message
    const author = msg.author;
    let mentionList = map2list(msg.mentions.users);

    const query_select = randQuery([
        "slap+anime", 
        "smack+anime"
    ]);

    tenorSearch(query_select, randIndex(resp_num), 
        (resp) => {
            // Pull of a gif
            const resp_gif = resp[0].media[0].gif.url;

            let resp_msg = "";
            
            if (mentionList.length === 0) {
                // No arguments given
                resp_msg += `${author}, slapped himself! Snap out of it.`;
            } else if (mentionList.length === 1){
                // A single argument is given
                // Check if author == argument
                if(mentionList[0].id === author.id){
                    resp_msg += `${author}, slapped himself! Snap out of it.`;
                } else {
                    resp_msg += `${author} slapped ${mentionList[0]}! Baaaaaka!`;
                }
            } else {
                // A list of mentions is provided
                for(let idx = 0; idx < mentionList.length - 1; idx++){
                    resp_msg += ` ${mentionList[idx]}`;
                }
                resp_msg += ` and ${mentionList[mentionList.length-1]}! Kono baka-domo ga!`
            }

            msg.channel.send(msgEmbed(resp_msg, resp_gif));
        }, 
        (err) => {
            // console.log(err);
            msg.channel.send(errMsg);
        }
    );
});

commands.set("ecchi", (msg) => {
    const args = extractArgument(msg);      // Extract arguments from the message
    const author = msg.author;
    let mentionList = map2list(msg.mentions.users);

    const query_select = randQuery([
        "you+pervert+anime",
        "lewd+anime"
    ]);

    tenorSearch(query_select, randIndex(resp_num), 
        (resp) => {
            // Pull of a gif
            const resp_gif = resp[0].media[0].gif.url;

            let resp_msg = "";
            
            if (mentionList.length === 0) {
                // No arguments given
                resp_msg += `${author} is being a little pervert.`;
            } else if (mentionList.length === 1){
                // A single argument is given
                // Check if author == argument
                if(mentionList[0].id === author.id){
                    resp_msg += `${author} is being a little pervert .`;
                } else {
                    resp_msg += `${mentionList[0]} no ecchi!`;
                }
            } else {
                // A list of mentions is provided
                for(let idx = 0; idx < mentionList.length - 1; idx++){
                    resp_msg += ` ${mentionList[idx]}`;
                }
                resp_msg += ` and ${mentionList[mentionList.length-1]} no ecchi!`
            }

            msg.channel.send(msgEmbed(resp_msg, resp_gif));
        }, 
        (err) => {
            // console.log(err);
            msg.channel.send(errMsg);
        },
        process.env.ECCHI_LEVEL
    );
});

module.exports = { commands };