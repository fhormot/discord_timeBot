const Discord = require("discord.js");

module.exports.extractArgument = (msg) => {
    const str = msg.content.split(' ').slice(1).join(" ");

    return (str) ? str : "";
}

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
}
