const Event = require('../../Structures/Event');
const TicketConfig = require('../../database/Mongodb/models/TicketConfig');
const { MessageEmbed } = require('discord.js');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
        })
    }
    async run(reaction, member) {
        if(member.bot) return;
        const guild = reaction.message.guild;

        const data = TicketConfig.findOne({
            guildId: guild.id
        });

        if(reaction.emoji.name === '🔒' && reaction.channel.id === data.channelId) {

            const userReactions = reaction.cache.filter(reaction => reaction.users.cache.has(member.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(member.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            await reaction.message.channel.updateOverwrite(TicketConfig.findOne('ticketAuthorId'), {
                'VIEW_CHANNEL': false,
                'SEND_MESSAGES': false
            });
            reaction.channel.send("The ticket has been closed... The channel will be deleted automatically...");
            TicketConfig.findOneAndUpdate({
                resolved: true
            });
            await TicketConfig.save();
            setTimeout(() => {
                reaction.channel.delete()
            }, 5000);
        } else if(reaction.emoji.name === '📌' && reaction.channel.id === data.channelId) {

            const userReactions = reaction.cache.filter(reaction => reaction.users.cache.has(member.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(member.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            const embed = new MessageEmbed()
                .setDescription("You will now be receiving help from " + reaction.member.tag)
                .setThumbnail(reaction.member.displayAvatarURL({ dynamic: true }))
                .setColor('RED');
            await reaction.channel.send(embed);
        }
    }
}

