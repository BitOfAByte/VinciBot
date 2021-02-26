const Command = require('../../Structures/Command');

module.exports = class purge extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['clear'],
            description: "deletes x amount of messages",
            nsfw: false,
            category: "Moderation",
            permission: "MANAGE_MESSAGES",
        })
    }

    async run(message, args) {
        const args2 = message.content.split(' ').slice(1);
        const amount = args2.join(' ');

        if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!');

        if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!');
        if (amount < 1) return message.reply('You have to delete at least 1 message!');

        await message.channel.messages.fetch({
            limit: amount
        }).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
}