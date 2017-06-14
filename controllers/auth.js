'use strict';
const util = require('util');
const express = require('express');
const EasyXml = require('easyxml');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const messages = require('../utils/messages');

const serializer = new EasyXml(config.easyXml);

module.exports = (authService) => {

    const baseController = require('./base_class');

    class authController extends baseController {
        constructor(service) {
            super(service);

            this.routes = {};
            this.setRoute('/', 'post', this.login);
            this.setRoute('/', 'put', this.register);
            this.setRoute('/', 'get', this.block);
            this.setRoute('/', 'delete', this.logout);
        }

        async login(req, res, next) {
            req.checkBody('email', 'E-mail required').notEmpty().isEmail();
            req.checkBody('password', 'Password required').notEmpty();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            let userId = await authService.login(req.body);
            if (userId !== undefined && userId !== null) {
                let token = jwt.sign({__user_id: userId}, config.jwt.key);
                res.cookie(config.cookie.key, token);
                res.redirect('/main');
            } else next(messages.badRequest);
            return;
        }

        async register(req, res, next) {
            req.checkBody('firstname', 'firstname required').notEmpty();
            req.checkBody('lastname', 'lastname required').notEmpty();
            req.checkBody('email', 'email required').notEmpty().isEmail();
            req.checkBody('password', 'Password required').notEmpty();

            let result = await req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send('Errors: ' + util.inspect(result.array()));
                return;
            }

            req.body.roleId = 1;
            if(!await authService.register(req.body))
                next(messages.wrongCredentials);
            else res.redirect('/index');
            return;
        }

        async logout(req, res, next) {
            res.cookie(config.cookie.key, '');
            next(messages.success);
            return;
        }
    }

    return new authController(authService);
};