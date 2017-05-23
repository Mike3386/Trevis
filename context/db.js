module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
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

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);

    User.belongsTo(Role);
    Role.hasMany(User);

    return {
        user: User,
        role: Role,

        sequelize: sequelize
    };
};