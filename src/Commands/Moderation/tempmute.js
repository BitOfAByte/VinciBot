const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = class tempmute extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'tempmutes the mentioned user',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['MANAGE_ROLES']
        });
    }

    async run(message, args) {
        const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ")
        const muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
        const time = args[2];
        if (message.mentions.users.size < 1) return message.reply("You must provide a user to mute!");

        if (reason.length < 1) return message.reply(`you must provide a reason to mute ${muteUser}`);

        if(!isNaN(args[2])) return message.channel.channel(args[0] + " is **NOT** a vaild number")

        muteUser.roles.add(muteRole);

        setTimeout(() => {
            muteUser.roles.remove(muteRole)
        },ms(time))
        const b = new MessageEmbed()
            .setAuthor(`${muteUser.user.tag}`)
            .addFields({
                name: `Muted member`,
                value: `${muteUser.user.tag}`,
                inline: true
            }, {
                name: "Muted by:",
                value: `${message.author.tag}`,
                inline: true
            }, {
                name: "Reason",
                value: `${reason}`,
                inline: true
            }, {
                name: "Date of punishment",
                value: message.createdAt.toLocaleString()
            }, )
            .setThumbnail(muteUser.user.displayAvatarURL())
            .setColor("#008b8b");

        message.channel.send(b);
    }
};