const { DataTypes, Model } = require('sequelize');

module.exports = class Ticket extends Model {
    static init(sequelize) {
        return super.init({
            guildId: {
                type: DataTypes.STRING
            },
            ticketId: {
                type: DataTypes.STRING
            },
            ticketAuthor: {
                type: DataTypes.STRING
            },
            ticketModerator: {
                type: DataTypes.STRING
            },
            messageId: {
                type: DataTypes.INTEGER
            }
        }, {
            tableName: 'Tickets',
            sequelize
        })
    }
}