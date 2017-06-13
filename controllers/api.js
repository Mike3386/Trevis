'use strict';
const express = require('express');

module.exports = (userService, authService, messageService, groupService, relService) => {
    const router = express.Router();

    const userController = require('./user')(userService);
    const authController = require('./auth')(authService);
    const messageController = require('./message')(messageService, userService, relService, groupService);
    const groupController = require('./group')(groupService, relService);

    router.use('/users', userController.getRouter());
    router.use('/sessions', authController.getRouter());
    router.use('/messages', messageController.getRouter());
    router.use('/groups', groupController.getRouter());

    return router;
};