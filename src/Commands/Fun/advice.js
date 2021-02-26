const Command = require('../../Structures/Command');
const superagent = require('superagent');

module.exports = class advice extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Advices you!',
            category: 'Fun',
            guildOnly: true,
            nsfw: false,
            category: "Fun"
        });
    }

    async run(message, args) {
        superagent.get('http://api.adviceslip.com/advice')
        .end((err, res) => {
            if(!err && res.status === 200) {
                try {
                    JSON.parse(res.text);
                } catch(e) {
                    return message.reply("API error occured. " + e)
                }
                const advice = JSON.parse(res.text);
                message.channel.send(advice.slip.advice)
            } else {
                return message.reply(`REST call failed: ${err}, status code: ${res.status}`)
            }
        })
    }
}