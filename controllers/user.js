'use strict';
module.exports = (userService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(UserController.prototype, BaseController.prototype);

    function UserController(userService, promiseHandler) {
        BaseController.call(this, userService, promiseHandler);

        this.routes['/'] = [{ method: 'put', cb: pay }];

        this.registerRoutes();

        return this.router;

        function pay(req, res) {
            promiseHandler(res,
                userService.pay(req.body)
            );
        }
    }

    return new UserController(userService, promiseHandler);
};