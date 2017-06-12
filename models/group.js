'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('groups', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        }
    });
};