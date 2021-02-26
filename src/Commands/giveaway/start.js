const Command = require('../../Structures/Command');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const { saveGiveaway, scheduleGiveaway } = require('../../Structures/giveaway');

const prompts = [
    'Give this giveaway a title',
    'What are you giving away?',
    'How long do you want this giveaway to last?',
    'How many winners?'
];


module.exports = class start extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['g', 'gstart', 'startgiveaway'],
            description: 'Starts a giveaway',
            category: 'Giveaway',
            ownerOnly: true,
            permissions: ["MANAGE_MESSAGE"]
        })
    }
    async run(message, args) {
        const channel = this.client.channels.cache.find(c => c.name === 'giveaways');
        if(channel) {
            try {
                const response = await getResponses(message);
                const embed = new MessageEmbed()
                    .addField('Title', response.title, true)
                    .addField('Prize', response.prize, true)
                    .addField('# of winners', response.winners, true)
                    .addField('Duration', response.duration, false);
                const msg = await message.channel.send('Confirm', embed);
                await msg.react('👍');
                await msg.react('👎');
                const filter = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
                const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']});
                const choise = reactions.get('👎') || reactions.get('👍');

                if(choise.emoji.name === '👍') {
                    response.endsOn = new Date(Date.now() + ms(response.duration));
                    const gembed = new MessageEmbed()
                        .setTitle(response.title)
                        .setColor("#ff0000")
                        .setDescription(`
                        Prize: ${response.prize}\n
                        Number of winners: ${response.winners}\n
                        Ends on: ${response.endsOn}\n
                        **REACT with 🎉 to ENTER**
                        `);
                    const gmsg = await channel.send(gembed)
                    await gmsg.react('🎉');
                    response.messageId = gmsg.id;
                    response.guildId = gmsg.guild.id;
                    response.channelId = gmsg.channel.id
                    await saveGiveaway(response);
                    await scheduleGiveaway(this.client, [response]);
                } else {
                    message.channel.send("No");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            message.reply("Cannot find the channel.... Maybe it was deleted...")
        }
    }
}

async function getResponses(message) {
    const vaildTime = /^\d+(s|m|h|d)$/;
    const vaildNumber = /\d+/;
    const responses = { }

    for(let i = 0; i < prompts.length; i++) {
        await message.channel.send(prompts[i]);
        const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
        const { content } = response.first();

        if(i == 0) 
            responses.title = content;
        else if(i == 1)
            responses.prize = content;
        else if(i == 2) {
            if(vaildTime.test(content))
                responses.duration = content;
            else 
                throw new Error('Invaild time format');
        }
        else if(i == 3) {
            if(vaildNumber.test(content)) 
                responses.winners = content;
            else
                throw new Error('Invaild numbers of winners');
        }
    }
    return responses;
}