const Giveaway = require('../database/Mongodb/models/Giveaway');
const schedule = require('node-schedule')

async function saveGiveaway(response) {
    const { title, prize, winners, duration, guildId, messageId, channelId, endsOn } = response;

    const giveaway = new Giveaway({
        guildId,
        messageId,
        channelId,
        duration,
        title,
        prize,
        winners,
        endsOn,
        createdOn: new Date(),
    });
    return giveaway.save();
}


async function scheduleGiveaway(client, giveaways) {
    for (let i = 0; i < giveaways.length; i++) {
        const { channelId, messageId, endsOn } = giveaways[i];
        console.log('Scheduling job for ' + endsOn);
        schedule.scheduleJob(endsOn, async () => {
            const channel = await client.channels.cache.get(channelId);
            if (channel) {
                const message = await channel.messages.fetch(messageId);
                if (message) {
                    const { embeds, reactions } = message;
                    const reaction = reactions.cache.get('🎉');
                    const users = await reaction.users.fetch();
                    const entries = users.filter(user => !user.bot).array();
                    const winners = entries[0];
                    if (embeds.length === 1) {
                        const embed = embeds[0];
                        embed.setDescription(`~~${embed.description}~~\n**CONGRATS TO: ${winners}**`);
                        await message.edit(embed);
                    }
                }
            }
        })
    }
}

module.exports = {
    saveGiveaway,
    scheduleGiveaway
}