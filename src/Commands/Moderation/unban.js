const Command = require('../../Structures/Command');


module.exports = class unban extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'unbans a member',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['BAN_MEMBERS', 'ADMINISTRATOR']
        })
    }
    async run(message, args) {
        let userID = args[0];

        if(!userID) return message.reply("Please provide a userid")
        if(!isNaN(args[0])) return message.channel.send("You must provide the id of the user..");

        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return message.channel.send("There is no bans in this guild");
            let bannedUser = bans.find(b => b.user.id === userID);
            if(!bannedUser) return message.channel.send(bannedUser + " is not banned");
            message.guild.members.unban(bannedUser.user).catch(err => console.log(err));
            message.channel.send("Unbanned " + args[0]);
        })
    }
}

async function unbanUser(userID) {
           
}