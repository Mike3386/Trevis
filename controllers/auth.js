'use strict';
const express = require('express');
const EasyXml = require('easyxml');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const messages = require('../utils/messages');

const serializer = new EasyXml(config.easyXml);

module.exports = (authService) => {

    const baseController = require('./base_class');

    class authController extends baseController{
        constructor(service){
            super(service);

            this.setRoute('/', 'post', this.login);
            this.setRoute('/', 'put', this.register);
            this.setRoute('/', 'delete', this.logout);
        }

        async login(req, res, next){
                let userId = await authService.login(req.body);
                if(userId!==undefined && userId!==null){
                    let token = jwt.sign({ __user_id: userId }, config.jwt.key);
                    res.cookie(config.cookie.key, token);
                    next(messages.success);
                }else
                    next(messages.badRequest);
        }

        async register(req, res, next){
            let ans = (await authService.register(req.body))?messages.success:messages.AnswerError("Not register");
            next(ans);
        }

        async logout(req, res, next) {
            res.cookie(config.cookie.auth, '');
            next(messages.success);
        }
    }

    return new authController(authService);
};