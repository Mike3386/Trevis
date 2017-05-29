'use strict';
const express = require('express');

module.exports = (userService, authService, config) => {
    const router = express.Router();

    const userController = require('./user')(userService);
    const authController = require('./auth')(authService, config);

    router.use('/users', userController.getRouter());
    router.use('/session', authController);

    return router;
};