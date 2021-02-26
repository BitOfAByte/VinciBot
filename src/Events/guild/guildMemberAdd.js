const { MessageEmbed } = require('discord.js');
const GuildConfig = require('../../database/Mysql/Models/Guilds');
const Event = require('../../Structures/Event');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};


module.exports = class guildMemberAdd extends Event {
    constructor(...args) {
        super(...args, [

        ])
    }
    async run(member) {
        const guild = member.guild;
        const userFlags = member.user.flags.toArray();
        const channel = guild.channels.cache.find(c => c.name === 'welcome');
        const count = guild.members.cache.filter((member) => !member.user.bot).size;
        const role = guild.roles.cache.find(r => r.name === 'Member');
        const config = GuildConfig.findOne({ where: { guildId: guild.id }});

        try {
            member.roles.add(role);
        } catch(err) {
            console.log(err);
        }

        config.memberSize = count;
        (await config).save();

        const embed = new MessageEmbed()
            .setTitle("**WELCOME TO VINCIMC**")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('User', [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Status:** ${member.user.presence.status}`,
            ]);

        return channel.send(embed);
    }
}