const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const TicketConfig = require('../../database/Mysql/Models/Ticket');

module.exports = class Ticket extends Command{
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

        message.delete({ timeout: 3000 });
        if(!topic) return message.reply("You need to type a topic...").then(m => m.delete({ timeout: 3000 }))

        await guild.channels.create(`Ticket-${message.author.tag}`, {
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
                .setDescription(`Hello ${message.author.tag}, Your ticket has been created. Please wait until a supporter or staff responds `)
                .addFields(
                    { name: "Submitter: ", value: message.author.username, inline: true},
                    { name: "Submitter id", value: message.author.id, inline: true},
                    { name: "Channel id", value: channel.id, inline: true},
                    { name: "Topic", value: `${topic}`, inline: false}
                )
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
                .setFooter(`©️ ${guild.name}`, guild.iconURL())
            const msg = await channel.send(embed);
            msg.react("📌");
            msg.react("🔒");

            console.log(channel.id);
            const ticket = await TicketConfig.create({
                guildId: guild.id,
                ticketAuthor: message.author.tag,
                channelId: channel.id,
                resolved: false,
                messageId: msg.id
            });

            const ticketId = String(ticket.getDataValue('ticketId')).padStart(4,0);
            await channel.edit({ name: `${ticketId}` })
        })
    }

}