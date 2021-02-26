const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class unmute extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'unmutes the mentioned user',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['MANAGE_ROLES']
        });
    }

    async run(message, args) {
        const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    
        if(message.mentions.users.size < 1) return message.reply("You must provide a user to mute!");
    
        muteUser.roles.remove(muteRole);
    
        const b = new MessageEmbed()
            .setAuthor(`${muteUser.user.tag}`)
            .addFields({
                name: `Unmuted member`,
                value: `${muteUser.user.tag}`,
                inline: true
            }, {
                name: "Unmuted by:",
                value: `${message.author.tag}`,
                inline: true
            },)
            .setThumbnail(muteUser.user.displayAvatarURL())
            .setColor("#008b8b");
    
            message.channel.send(b);
    }
};