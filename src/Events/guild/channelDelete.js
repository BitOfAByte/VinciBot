const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');

module.exports = class channelDelete extends Event {
    constructor(...args) {
        super(...args, {

        })
    }
    async run(channel) {

        const guildConfig = await Guilds.findOne({ where: {guildId: channel.guild.id } });

        guildConfig.channelSize = channel.guild.channels.cache.size;
        guildConfig.save();
    }
}