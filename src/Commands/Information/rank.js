const Command = require('../../Structures/Command');
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');

module.exports = class rank extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "displays rank info",
            guildOnly: true,
            category: "Information"
        });
    }

    async run(message, args) {

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
        const user = await Levels.fetch(member.id, message.guild.id);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        if(!user) return message.reply("You don't have any xp try sending some messages");

        const rank = new canvacord.Rank()
            .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(member.user.presence.status)
            .setLevel(user.level)
            .setRank(2, "idj", false)
            .setProgressBar("#FFA500", "COLOR")
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator);

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
    }
}