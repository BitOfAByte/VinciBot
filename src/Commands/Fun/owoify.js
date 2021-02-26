const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class owoify extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Owoifys text!',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
            category: "Fun"
        });
    }

    async run(message, args) {
    
    if (!args[0]) return message.reply("You need to input a sentence to OwOify")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/owoify?text=" + args.join('%20'));
    
    
    message.channel.send(body.owo)
    
    
    
    }
}
