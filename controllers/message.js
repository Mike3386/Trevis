'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (userService) => {
    const BaseController = require('./base_class');

    class MessageController extends BaseController {
        constructor(service) {
            super(service);

            this.setRoute('/', 'get', this.read);
            this.setRoute('/', 'post', this.create);
            this.setRoute('/:id', 'put', this.block);
        }

        async read(req, res, next){
            req.checkQuery('type', 'type required and must be number').notEmpty();
            let data;
            if(req.query.type === 'user')
                data = await this.service.repository.find(
                    {
                        where:{receiverIdUser:req.userId},
                        limit:req.query.limit,
                        offset: req.query.offset
                    }
                );
            else
                data = await this.service.repository.find(
                    {
                        where:{receiverIdGroup:req.query.receiverIdGroup},
                        limit:req.query.limit,
                        offset: req.query.offset
                    }

                );

            next(data.dataValues);
        }

        async create(req, res, next) {
            req.checkBody('text', 'Text required').notEmpty();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            req.body = {
                text: req.body.text,
                senderId: req.userId,
                receiverIdUser: req.body.recieverIdUser,
                receiverIdGroup: req.body.receiverIdGroup
            };
            let data = await this.service.baseCreate(req.body);
            next(message.success);
        }
    }

    return new MessageController(userService);
};