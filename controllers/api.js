'use strict';
const express = require('express');

module.exports = (userService, authService, messageService, groupService, relService) => {
    const router = express.Router();

    const userController = require('./user')(userService);
    const authController = require('./auth')(authService);
    const messageController = require('./message')(messageService);
    const groupController = require('./group')(groupService);
    const relController = require('./rel')(relService);

    router.use('/users', userController.getRouter());
    router.use('/session', authController.getRouter());
    router.use('/message', messageController.getRouter());
    router.use('/group', groupController.getRouter());
    router.use('/rel', relController.getRouter());

    return router;
};