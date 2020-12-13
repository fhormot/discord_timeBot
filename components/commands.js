const axios = require('axios').default;
const time_API_url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY}&tz=`;

let commands = new Map();

function extractArgument(msg) {
    const str = msg.content.split(' ')[1];

    return (str) ? str : "";
}

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

commands.set("help", (msg) => {
    msg.channel.send(
        `Use '?' to address the bot. The following commands are available:
        \t- help - prints this help dialog.
        \t- time (city) - Returns the current time in the given city (eg. ?time Tokyo will return the current time in Tokyo).`
    );
});

module.exports = { commands };