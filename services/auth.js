'use strict';
const messages = require('../utils/messages');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');

bluebird.promisifyAll(bcrypt);

module.exports = (userRepository) => {
    return {
        login: login,
        register: register,
    };

    async function login(data) {
        let user = await userRepository.findOne({where: {email: data.email}, attributes: ['id', 'password']});

        if (user === null || !(await bcrypt.compareAsync(data.password, user.password))) {
            return;
        }

        return user.id;
    }

    async function register(data) {
        let data = await userRepository.findOne({where: {email: data.email}});
        if (data === null) {
            data.password = await bcrypt.hashAsync(data.password, config.bcrypt.salt);

            let user = {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            };

            await userRepository.create(user);
            return true;
        }
        else return false;
    }

};