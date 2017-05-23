'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: Sequelize.STRING
    });
};
