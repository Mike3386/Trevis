'use strict';
module.exports = (userService) => {
    const BaseController = require('./base_class');

    class UserController extends BaseController {
        constructor(service) {
            super(service);
        }

        pay(req, res) {
            //this.promiseHandler(res, this.service.pay(req.body));
        }
    }

    return new UserController(userService);
};