const Command = require('../../Structures/Command');
const {MessageEmbed} = require('discord.js');
const TicketConfig = require('../../database/Mongodb/models/TicketConfig');

module.exports = class Ticket extends Command {
    constructor(...args) {
        super(...args, {
            name: "ticket",
            aliases: ['t', 'new', 'ti', 'tic'],
            category: "Support",
            permissions: ['SEND_MESSAGES'],
            description: "creates a new channel"
        });
    }

    async run(message, args) {
        const guild = message.guild;
        const topic = args.slice().join(" ");

        message.delete({timeout: 3000});
        if (!topic) return message.reply("You need to type a topic...").then(m => m.delete({timeout: 3000}))

        const data = TicketConfig.findOne({
            guildId: guild.id
        });
        const id = data.ticketId +=1;

        await guild.channels.create(`ticket-${message.author.discriminator}`, {
            type: 'text',
            parent: '797229594717192244',
            topic: `${topic}`,
            permissionOverwrites: [{
                id: guild.roles.everyone,
                deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
            },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                },
                {
                    id: "797638165040857099",
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                }
            ]
        }).then(async channel => {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setTitle("**VINCI SUPPORT**")
                .setDescription(`Your ticket has been created, how can we help?`)
                .addFields(
                    {name: "Submitter: ", value: message.author.username, inline: true},
                    {name: "Submitter id", value: message.author.id, inline: true},
                    {name: "Channel id", value: channel.id, inline: true},
                    {name: "Topic", value: `${topic}`, inline: false}
                )
                .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512, format: "png"}))
                .setFooter(`©️ ${guild.name}`, guild.iconURL())
            const msg = await channel.send(embed);
            msg.react("📌");
            msg.react("🔒");

            const ticket = new TicketConfig({
                guildId: guild.id,
                messageId: msg.id,
                channelId: channel.id,
                resolved: false,
                ticketAuthor: message.author.tag,
                ticketAuthorId: message.author.id,
            });
            await  ticket.save();
        })
    }
}