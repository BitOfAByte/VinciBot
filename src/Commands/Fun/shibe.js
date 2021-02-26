const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const {request} = require('superagent');

module.exports = class shibe extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Gives you your favourite dog',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: []
        });
    }

    async run(message, args) {
     const { body } = await superagent
  .get(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)

  const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Want Shibe?")
    .setImage(body[0])
    message.channel.send({embed});
    
    
    }
}
