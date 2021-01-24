const Discord = require("discord.js");
const axios = require('axios').default;

module.exports.extractArgument = (msg) => {
    const str = msg.content.split(' ').slice(1).join(" ");

    return (str) ? str : "";
}

const errMsg    = `Something went wrong. Let me call my dad. x_x`
const footerMsg = `Via Tenor.`;

module.exports.errMsg = errMsg;
module.exports.footerMsg = footerMsg;

module.exports.map2list = (map) => {
    let list = [];

    for (var entry of map.entries()){
        list.push(entry[1]);
    }

    return list;
}

module.exports.msgEmbed = (msg, gif) => {
    return new Discord.MessageEmbed()
        .setDescription(`${msg}`)
        .setImage(gif);
        // .setFooter(footerMsg);
}

const randIndex = (length) => {
    return Math.floor(Math.random()*length);
}
module.exports.randIndex = randIndex;

module.exports.randQuery = (list) => {
    return list[randIndex(list.length)];
}

const tenorSearchURL = (query, pos, filter) => {
    return `https://api.tenor.com/v1/search`
        + `?q=${query}`
        + `&locale=en_US`
        + `&contentfilter=${filter}`              
        + `&media_filter=minimal`
        + `&limit=1`
        + `&pos=${pos}`
        + `&key=${process.env.TENOR_API_KEY}`;
}

/**
 *  @param search_query (string)    Gif search query.
 *  @param pos          (integer)   Search query offset. Used to randomize the response gifs but still to return one result (less data).
 *  @callback           (function)  Callback function for a successful response.
 *  @error              (function)  Callback function for an unsuccessful response.
 */
module.exports.tenorSearch = (search_query, pos, callback, error, filter="off") => {
    axios.get(tenorSearchURL(search_query, pos, filter))
        .then((resp) => {
            callback(resp.data.results);
        })
        .catch((err) => {
            error(err);
        })
}