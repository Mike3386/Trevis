'use strict';
const express = require('express');
const errors = require('../utils/messages');
const util = require('util');
module.exports = class BaseController {
    constructor(service) {
        this.routes = {};

        this.setRoute('/', 'get', this.readAll);
        this.setRoute('/', 'post', this.create);
        this.setRoute('/:id', 'put', this.update);
        this.setRoute('/:id', 'get', this.read);
        this.setRoute('/:id', 'delete', this.del);

        this.service = service;
    }

    setRoute(path, method, callback) {
        let key = JSON.stringify({path: path, method: method});
        this.routes[key] = {callback: callback};
    }

    deleteRoute(path, method) {
        this.routes.delete(JSON.stringify({path: path, method: method}));
    }

    getRouter() {
        let router = express.Router();
        let keys = Object.keys(this.routes);

        for (let key in this.routes) {
            if (this.routes.hasOwnProperty(key)) {
                let currKey = JSON.parse(key);
                router[currKey.method](currKey.path, this.routes[key].callback.bind(this));
            }
        }

        return router;
    }

    async readAll(req, res, next) {
        try {
            let data = await this.service.readChunk(req.params);
            next(data);
        } catch (err) {
            next(err);
        }
    }

    async read(req, res, next) {
        req.checkParams('id', 'Id required and must be number').notEmpty().isNumeric();

        let result = await req.getValidationResult();
        if (!result.isEmpty()) {
            res.status(400).send('Errors: ' + util.inspect(result.array()));
            return;
        }

        let data = await this.service.readById(req.params.id);
        next(data);
    }

    async create(req, res, next) {
        let data = await this.service.baseCreate(req.body);
        next(data);
    }

    async update(req, res, next) {
        let data = await this.service.baseUpdate(req.params.id, req.body);
        next(data);
    }

    async del(req, res, next) {
        req.checkParams('id', 'Id required and must be number').notEmpty().isNumeric();

        let result = await req.getValidationResult();
        if (!result.isEmpty()) {
            res.status(400).send('Errors: ' + util.inspect(result.array()));
            return;
        }

        let data = await this.service.baseDelete(req.body.id);
        next(data);
    }

    async block(req, res) {
        res.status(403).json(errors.accessDenied);
    }
};