const mongoose = require('mongoose');

const TicketConfig = new mongoose.Schema({
    guildId: { type: String, required: true},
    messageId: { type: String, required: true},
    channelId: { type: String, required: true},
    resolved: { type: Boolean, required: true},
    ticketId: { type: Number, required: false},
    moderator: { type: String, required: false},
    moderatorId: { type: String, required: false},
    ticketAuthor: { type: String, required: true},
    ticketAuthorId: { type: String, required: true}
});

module.exports = mongoose.model('Tickets', TicketConfig);
