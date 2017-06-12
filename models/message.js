'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('messages', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        text: Sequelize.STRING
    });
};