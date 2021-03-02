const mongoose = require('mongoose');

const guildConfig = new mongoose.Schema({
    guildId: { type: String },
    guildName: { type: String },
    guildOwner: { type: String },
    guildOwnerId: { type: String },
    channelSize: { type: Number },
    memberSize: { type: Number },
    roleSize: { type: Number },
    banSize: { type: Number },
});

module.exports = mongoose.model('Guilds', guildConfig);