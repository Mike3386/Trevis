'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (groupService) => {
    const BaseController = require('./base_class');

    class GroupController extends BaseController {
        constructor(service) {
            super(service);

            this.setRoute('/', 'post', this.create);
        }

        async create(req, res, next) {
            req.checkBody('name', 'name required and must be number').notEmpty();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            req.body = {
                name: req.body.name
            };
            let ex = await this.service.repository.find({where:{
                name: req.body.name
            }});
            if(ex) next(message.AlreadyExists);
            else {
                let data = await this.service.baseCreate(req.body);
                next(message.success);
            }
            return;
        }
    }

    return new GroupController(groupService);
};