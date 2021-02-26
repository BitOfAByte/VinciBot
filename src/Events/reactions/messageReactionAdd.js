
const Event = require('../../Structures/Event');
const {MessageEmbed } = require('discord.js');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: false
        })
    }
    async run(reaction, user) {
    }
}