const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const {request} = require('superagent');
const superagent = require('superagent');

module.exports = class pat extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Pats the mentioned user!',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message, args) {
    
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them :3");
    if (message.mentions.users.first().id === this.client.user.id) return message.channel.send('<a:yayyy:497742636439044096>');
    if (message.mentions.users.first().id === message.author.id) return message.channel.send('I see you\'re lonely,.. ***headpats you***');
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to pat them ");
    if (message.mentions.users.first().id === this.client.user.id) return message.channel.send('*Why me....?*');
    if (message.mentions.users.first().id === message.author.id) return message.channel.send('I understand, you\'ve got no one to pat');
    const { body } = await superagent
    .get("https://nekos.life/api/pat");
    
    const embed = new MessageEmbed()
    .setColor("#ff9900")
    .setTitle(` ${message.mentions.users.first().username}, got a pat from ${message.author.username}!`)
    .setImage(body.url) 
    message.channel.send({embed})
    
    
    
    }
}
