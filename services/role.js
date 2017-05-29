'use strict';
const messages = require('../utils/messages');

module.exports = (roleRepository) => {
    const BaseService = require('./base');

    class RoleService extends BaseService {
        constructor(roleRepository) {
            super(roleRepository);
        }

        async baseCreate(data) {
            let user = {
                name: data.name
            };

            return await super.baseCreate(user);
        }
    }

    return new RoleService(roleRepository);
};