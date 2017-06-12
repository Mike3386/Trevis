'use strict';
module.exports = (userRepository, roleRepository) => {
    const BaseService = require('./base');

    class UserService extends BaseService {
        constructor(userRepository) {
            super(userRepository);
            this.defaultUser = {
                roleId: 1
            }
        }

        async baseUpdate(data) {
            let user = {
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            };

            return await super.baseUpdate(data.id, user);
        }

        async baseCreate(user){
            user = Object.assign({}, this.defaultUser, user);
            await super.baseCreate(user);
        }
    }

    return new UserService(userRepository, roleRepository);
};