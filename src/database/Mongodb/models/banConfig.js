const mongoose = require('mongoose');


const banConfig = new mongoose.Schema({
    User: { type: String, required: true},
    UserID: { type: String, required: true},
    UserTag: { type: String, required: true},
    Reason: { type: String, required: true},
    Duration: { type: String, required: true}, 
    Active: { type: Boolean, required: false},
    Moderator: { type: String, required: true},
    ModeratorTag: { type: String, required: true},
    ModeratorID: { type: String, required: true},
});

module.exports = mongoose.model('bans', banConfig)