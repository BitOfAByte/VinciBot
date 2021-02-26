const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const BlackList = require('../../database/Mongodb/models/blacklist');

module.exports = class blacklist extends Command {
    constructor(...args) {
        super(...args, {
            name: "blacklist",
            aliases: ['bl'],
            permissions: ["ADMINISTRATOR"],
            description: "Adds a user to a blacklist and prevents them from executing commands"
        });
    }

    async run(message, args) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
        
        if(!user) return message.reply("You must provide a user to blacklist");
        if(!reason) return message.reply("You must provide a reason to blacklist");

        const bl = new BlackList({
            userName: user.user.tag,
            userID: user.id,
            moderator: message.author.tag,
            moderatorID: message.author.id,
            reason: reason
        });
        bl.save();
    }
}