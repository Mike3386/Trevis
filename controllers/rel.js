'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (relService) => {
    const BaseController = require('./base_class');

    class MessageController extends BaseController {
        constructor(service) {
            super(service);

            this.setRoute('/:id', 'put', this.block);
        }

        async create(req, res, next) {
            req.checkBody('groupId', 'group id required and must be number').notEmpty().isNumeric();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            req.body = {
                groupId: req.body.groupId,
                userId: req.userId,
            };

            let ex = await this.service.repository.find({where:{
                groupId: req.body.groupId,
                userId: req.userId
            }});
            if(ex) next(message.AlreadyExists);
            else {
                let data = await this.service.baseCreate(req.body);
                next(message.success);
            }

            return;
        }
    }

    return new MessageController(relService);
};