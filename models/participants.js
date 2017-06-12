'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('participants', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
};