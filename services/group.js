'use strict';
module.exports = (groupRepository, relRepository) => {
    const BaseService = require('./base');

    class GroupService extends BaseService {
        constructor(userRepository) {
            super(userRepository);
            this.defaultConfig.readChunk.orderField = 'createdAt';
        }

        async baseCreate(group){
            group = Object.assign({}, this.defaultUser, group);
            return await super.baseCreate(group);
        }
    }

    return new GroupService(groupRepository, relRepository);
};