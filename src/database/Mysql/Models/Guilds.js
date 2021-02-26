const { DataTypes, Model } = require('sequelize');

module.exports = class Guilds extends Model {
    static init(sequelize) {
        return super.init({
            guildId: {
                type: DataTypes.STRING
            },
            guildName: {
                type: DataTypes.STRING
            },
            guildOwner: {
                type: DataTypes.STRING
            },
            guildOwnerId: {
                type: DataTypes.STRING
            },
            guildBans: {
                type: DataTypes.INTEGER
            },
            memberSize: {
                type: DataTypes.INTEGER
            },
            roleSize: {
                type: DataTypes.INTEGER
            },
            channelSize: {
                type: DataTypes.INTEGER
            }
        }, {
            tableName: 'Guilds',
            sequelize
        })
    }
}