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

    User.belongsTo(Role);
    Role.hasMany(User);

    return {
        user: User,
        role: Role,

        sequelize: sequelize
    };
};