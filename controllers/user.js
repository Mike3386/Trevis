'use strict';
module.exports = (userService, promiseHandler) => {
    const BaseController = require('./base_class');

    class UserController extends BaseController {
        constructor(service, promiseHandler) {
            super(service, promiseHandler);
            this.router.put('/', (req, res) => this.pay(req, res));
        }

        pay(req, res) {
            this.promiseHandler(res, this.service.pay(req.body));
        }
    }
    return new UserController(userService, promiseHandler);
};