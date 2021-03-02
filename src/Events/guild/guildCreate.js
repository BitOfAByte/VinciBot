const Event = require('../../Structures/Event');
const Guild = require('../../database/Mongodb/models/guildConfig');


module.exports = class guildCreate extends Event {
    constructor(...args) {
        super(...args, {

        });
    }
    async run(guild) {
        const bans = await guild.fetchBans();
        const count = guild.members.cache.filter((member) => !member.user.bot).size;
        const data = new Guild({
            guildId: guild.id,
            guildName: guild.name,
            guildOwner: guild.owner.user.tag,
            guildOwnerId: guild.owner.id,
            channelSize: guild.channels.cache.size,
            memberSize: count,
            roleSize: guild.roles.cache.size,
            banSize: bans.size,
        });
        await data.save();
        console.log([
            `Joined ${guild.name}`,
            `Guild id: ${guild.id}`,
            `Guild name: ${guild.name} `,
            `Guild Owner: ${guild.owner.user.tag}`,
            `Guild Owner id: ${guild.owner.id}`,
            `Guild Members: ${count}`,
            `Role Count: ${guild.roles.cache.size}`
        ].join('\n'));
    }
}