'use strict';
const messages = require('../utils/messages');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');

bluebird.promisifyAll(bcrypt);

module.exports = (userRepository) => {
    return {
        login: login,
        register: register
    };

    async function login(data) {
        let user = await userRepository.findOne({where: {email: data.email}, attributes: ['id', 'password']});

        if (user === null || !(await bcrypt.compareAsync(data.password, user.password))) return;

        return user.id;
    }

    async function register(params) {
        let data = await userRepository.findOne({where: {email: params.email}});
        if (data === null) {
            let salt = bcrypt.genSaltSync(config.bcrypt.salt);
            params.password = await bcrypt.hashAsync(params.password, salt);

            let user = {
                email: params.email,
                password: params.password,
                firstname: params.firstname,
                lastname: params.lastname,
                roleId: params.roleId
            };

            await userRepository.create(user);
            return true;
        }
        else return false;
    }

};