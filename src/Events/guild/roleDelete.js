const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');


module.exports = class roledelete extends Event {
    constructor(...args) {
        super(...args, {
        })
    }
    async run(role) {
        const guildConfig = await Guilds.findOne({ where: {guildId: role.guild.id } });

        guildConfig.roleSize = role.guild.roles.cache.size;
        guildConfig.save();
    }
} 