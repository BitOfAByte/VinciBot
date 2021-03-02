const Command = require('../../Structures/Command');

const { MessageEmbed } = require('discord.js');

module.exports = class ban extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            permission: ['ADMINISTRATOR', 'BAN_MEMBERS'],
            description: "bans a member from your guild",
            category: "Moderation",
            usage: "v!ban @user @reason"
        })
    }
    async run(message, args) {
        const member = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
        const guild = message.guild;
        if(member.length <  1) return message.reply("You must provide a guild member")

        if(!reason) return message.reply("You must provide a reason to ban!")


        if(!member.bot) {
            member.send({
                embed: {
                    title: `Hello ${member.user.tag}`,
                    description: `You have been banned in ${guild.name}\nReason: ${reason}\nModerator: ${message.author.tag}\n Moderator id: ${message.author.id}s`,
                    color: "#ff0000"
                }
            });
        }


        const bans = new banConfig({
            guildId: guild.id,
            banId: 21332,
            duration: "Perm",
            moderator: message.audio.tag,
            moderatorId: message.author.id,
            member: member.user.tag,
            memberId: member.id,
            reason: reason,
            active: true
        });


        const embed = new MessageEmbed()
            .setTitle("**VinciMC**")
            .addFields(
                { name: "Member ", value: member.user.tag, inline: true},
                { name: "Reason ", value: reason, inline: true},
                { name: "Moderator ", value: message.author.tag, inline: false},
                { name: "Moderator id ", value: message.author.id, inline: false},
            )
            .setTimestamp()
            .setColor("#ff0000")
            .setFooter(`©️ by ${guild.iconURL()}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }));

        return message.channel.send(embed);
    }
}