'use strict';
module.exports = (userRepository, roleRepository) => {
    const BaseService = require('./base');

    class UserService extends BaseService {
        constructor(userRepository) {
            super(userRepository);
            this.defaultConfig.readChunk.orderField = 'createdAt';
        }

        async baseCreate(message){
            message = Object.assign({}, this.defaultUser, message);
            await super.baseCreate(message);
        }
    }

    return new UserService(userRepository, roleRepository);
};