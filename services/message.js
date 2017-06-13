'use strict';
module.exports = (userRepository, roleRepository) => {
    const BaseService = require('./base');

    class MessageService extends BaseService {
        constructor(userRepository) {
            super(userRepository);
            this.defaultConfig.readChunk.orderField = 'createdAt';
        }

        async baseCreate(message) {
            message = Object.assign({}, this.defaultUser, message);
            return await super.baseCreate(message);
        }

        async setReadedUser(limit, page, idSend, idRec) {
            return this.repository.update({status: 'readed'}, {
                where: {
                    $and: {
                        receiverIdUser: idRec,
                        senderId: idSend
                    }
                },
                limit: limit || 10,
                page: page || 1
            });
        }

        async setReadedGroup(limit, page, idSend, idRec) {
            idSend = parseInt(idSend);
            return this.repository.update({status: 'readed'}, {
                where: {
                    $and: {
                        receiverIdGroup: idRec,
                        senderId: {$ne:idSend}
                    }
                },
                limit: limit || 10,
                page: page || 1
            });
        }
    }

    return new MessageService(userRepository, roleRepository);
};