'use strict';
const express = require('express');

module.exports = (userService, authService, config) => {
    const router = express.Router();

    const userController = require('./user')(userService, promiseHandler);
    const authController = require('./auth')(authService, config);

    router.use('/users', userController);
    router.use('/session', authController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}