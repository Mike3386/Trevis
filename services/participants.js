'use strict';
module.exports = (parRepository) => {
    const BaseService = require('./base');

    class UserService extends BaseService {
        constructor(userRepository) {
            super(userRepository);
            this.defaultConfig.readChunk.orderField = 'createdAt';
        }

        async baseCreate(group){
            group = Object.assign({}, this.defaultUser, group);
            return await super.baseCreate(group);
        }
    }

    return new UserService(parRepository);
};