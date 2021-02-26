const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class kick extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Kicks the mentioned user of the discord server',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['KICK_MEMBERS']
        });
    }

    async run(message, args) {
        const target = message.mentions.members.first();
        const reason = args.slice(1).join(" ");

        if(!reason) return message.reply("You must provide a reason");
        if (target) {
            
            const b = new MessageEmbed()
                .setAuthor(`${target.user.tag}`)
                .addFields({
                    name: `Kicked member`,
                    value: `${target.user.tag}`,
                    inline: true
                }, {
                    name: "Kicked by:",
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
                .setThumbnail(target.user.displayAvatarURL())
                .setColor("#008b8b");

            message.channel.send(b);

            await target.send({
                embed: {
                    title: `Dear ${target.user.tag}`,
                    description: `You have been kicked from ${message.guild.name}\n \nkicked by: \n \n${message.author.tag} \n \nreason: ${reason}\n \nDate of punishment: ${message.createdAt.toLocaleString()}`,
                    color: `#008b8b`
                }
            }).then(async() => {
                target.kick(target.id).catch(err => {
                    console.log(err);
                });
            });
        }
    }
};