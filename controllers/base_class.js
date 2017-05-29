'use strict';
const express = require('express');
const errors = require('../utils/messages');

module.exports = class BaseController {
    constructor(service) {
        this.routes = {};

        this.setRoute('/', 'get', this.readAll);
        this.setRoute('/', 'post', this.create);
        this.setRoute('/', 'put', this.update);
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
            console.log(this.service.readChunk);
            let data = await this.service.readChunk(req.params);
            next(data);
        } catch (err) {
            next(err);
        }

    }

    async read(req, res) {
        let data = await this.service.readById(req.params.id);
    }

    async create(req, res) {
        let data = await this.service.create(req.body);
    }

    async update(req, res) {
        let data = await this.service.update(req.body);
    }

    async del(req, res) {
        let data = await this.service.delete(req.body.id);
    }

    async block(req, res) {
        res.status(403).json(errors.accessDenied);
    }
};