const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class warn extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'warns the mentioned user',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['MANAGE_ROLES']
        })
    }
    async run(message, args) {
        const warnUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ")

        if (message.mentions.users.size < 1) return message.reply("You didn't provide a user to warn!");

        if (reason.length < 1) return message.reply(`You must provide a reason to warn ${warnUser}`);

        const b = new MessageEmbed()
            .setAuthor(`${warnUser.user.tag}`)
            .addFields({
                name: `Warned member`,
                value: `${warnUser.user.tag}`,
                inline: true
            }, {
                name: "Warned by:",
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
            .setThumbnail(warnUser.user.displayAvatarURL())
            .setColor("#008b8b");

        message.channel.send(b);

        await warnUser.send({
            embed: {
                title: `Dear ${warnUser.user.tag}`,
                description: `You have been Warned in ${message.guild.name}\n \nWarned by: \n \n${message.author.tag} \n \nReason: ${reason}\n \nDate of ban: ${message.createdAt.toLocaleString()}`,
                color: `#008b8b`
            }
        })
    }
}