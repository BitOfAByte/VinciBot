const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

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

    }

}