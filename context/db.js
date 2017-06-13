module.exports = (Sequelize, config) => {
    const options = {
        host: config.options.host,
        dialect: config.options.dialect,
        dialectOptions: config.options.dialectOptions,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.name, config.user, config.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Message = require('../models/message')(Sequelize, sequelize);
    const Group = require('../models/group')(Sequelize, sequelize);
    const Participants = require('../models/participants')(Sequelize, sequelize);

    User.belongsTo(Role);
    Role.hasMany(User);
    Message.belongsTo(User, {foreignKey:'senderId'});
    Message.belongsTo(User, {foreignKey:'receiverIdUser'});
    Message.belongsTo(Group, {foreignKey:'receiverIdGroup'});

    Participants.belongsTo(Group, {foreignKey:'groupId'});
    Participants.belongsTo(User, {foreignKey:'userId'});

    return {
        user: User,
        role: Role,
        message: Message,
        participant: Participants,
        group: Group,

        sequelize: sequelize
    };
};