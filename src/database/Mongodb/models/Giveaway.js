const mongoose = require('mongoose');

const GiveawaySchema = new mongoose.Schema({
    guildId: { type: String, required: true},
    messageId: { type: String, required: true},
    channelId: { type: String, required: true},
    title: { type: String, required: true},
    prize: { type: String, required: true},
    duration: { type: String, required: true},
    winners: { type: Number, required: true},
    endsOn: { type: Date, required: true},
    createdOn: { type: Date, required: true},
});

module.exports = mongoose.model('giveaways', GiveawaySchema);