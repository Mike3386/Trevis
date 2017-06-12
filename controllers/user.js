'use strict';
const util = require('util');
module.exports = (userService, groupService) => {
    const BaseController = require('./base_class');

    class UserController extends BaseController {
        constructor(service) {
            super(service);
        }

        async reada(req, res) {
            req.checkParams('id', 'Id required and must be number').notEmpty().isNumeric();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            let data = await this.service.readById(req.userId);


            res.render('../views/main', {user:data});
        }
    }

    return new UserController(userService);
};