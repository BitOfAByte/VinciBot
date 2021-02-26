const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
		});
	}

	async run(guild) {
        const count = guild.members.cache.filter((member) => !member.user.bot).size;
        const bans = await guild.fetchBans()
        Guilds.create({
            guildId: guild.id,
            guildName: guild.name,
            guildOwner: guild.owner.user.tag,
            guildOwnerId: guild.owner.user.id,
            guildBans: bans.size,
            memberSize: count,
            roleSize: guild.roles.cache.size,
            channelSize: guild.channels.cache.size
        })
        console.log("Joined " + guild.name);      
	}
};