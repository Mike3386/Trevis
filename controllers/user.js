'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (userService, groupService) => {
    const BaseController = require('./base_class');

    class UserController extends BaseController {
        constructor(service) {
            super(service);
            this.routes = {};
            this.setRoute('/', 'get', this.read);
        }

        async read(req, res, next) {
            req.checkParams('id', 'Id required and must be number').notEmpty().isNumeric();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            if(req.params.id == null || !await this.service.isExist(req.params.id)) {
                next(message.InvalidParams(['id']));
                return;
            }

            let data = await this.service.readById(req.userId);
            //res.render('../views/main', {user:data});
            next(data);
        }
    }

    return new UserController(userService);
};