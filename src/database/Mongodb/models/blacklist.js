const mongoose = require('mongoose');

const blackList = new mongoose.Schema({
    userName: { type: String, required: true },
    userID: { type: String, required: true },
    moderator: { type: String, required: true },
    moderatorID: { type: String, required: true },
    reason: { type: String, required: true },
});

module.exports = mongoose.model('blacklist', blackList);