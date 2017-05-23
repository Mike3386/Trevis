'use strict';
module.exports = (userRepository, roleRepository, errors) => {
    const BaseService = require('./base');

    class UserService extends BaseService {
        constructor(userRepository, errors) {
            super(userRepository, errors);
        }

        pay(data) {
            return new Promise((resolve, reject) => {
                let user = {
                    cache: data.cache
                };

                self.baseUpdate(data.id, user)
                    .then(resolve).catch(reject);
            })
        }

        update(data) {
            return new Promise((resolve, reject) => {
                let user = {
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                };

                self.baseUpdate(data.id, user)
                    .then(resolve).catch(reject);
            });
        }
    }

    return new UserService(userRepository, roleRepository, errors);
};