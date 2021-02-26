const Command = require('../../Structures/Command');
const { inspect } = require('util');
const { VultrexHaste } = require('vultrex.haste');
const haste = new VultrexHaste({url: "https://haste.bin"})
const { Type } = require('@extreme_hero/deeptype');
module.exports = class ass extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: "evaluates javascript.",
            category: "Owners",
            nsfw: false,
            ownerOnly: true
        })
    }
    async run(message, args) {
        const msg = message;
        if(!args.length) return msg.reply(`Provide javascript code to evaluate...`);

        let code = args.join(' ');

        code = code.replace(/[""]/g, '"').replace(/[""]/g, "'");
        let evaled;

        try {
            const start = process.hrtime();
            evaled = eval(code);
            if(evaled instanceof Promise) {
                evaled = await evaled;
            }

            const stop = process.hrtime(start);
            const response = [
                `**Output:** \`\`\`js\n${this.clean(inspect(evaled, {depth: 0}))}\n\`\`\``,
                `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                `**Time taken:** \`\`\`${(((stop[0] * 1e0) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n');
            if(res.length < 2000) {
                await msg.channel.send(res);
            } else {
                haste.post(res);
            }
        } catch(e) {
            return message.channel.send(`Error: \`\`\`x1\n${this.clean(e)}\n\`\`\``);
        }
    };

    clean(text) {
        if(typeof text === 'string') {
            text = text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(this.client.token, 'gi'), 'No token for you bitch')
        }
        return text;
    }
};