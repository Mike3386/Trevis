'use strict';
const express = require('express');
const errors = require('../utils/errors');

module.exports = class BaseController {
    constructor(service, promiseHandler) {

        this.routes = [];
        this.routes[{path: '/', method: 'get'}]({callback: (req, res) => this.readAll(req, res)});


        /*this.router.get('/', (req, res) => this.readAll(req, res));
         this.router.post('/', (req, res) => this.create(req, res));
         this.router.put('/', (req, res) => this.update(req, res));
         this.router.get('/:id', (req, res) => this.read(req, res));
         this.router.delete('/:id', (req, res) => this.del(req, res));*/

        this.service = service;
        this.promiseHandler = promiseHandler;
    }

    get router() {
        let router = express.Router();
        let keys = this.routes.keys();
        for (let pm in keys)
            if (keys.hasOwnProperty(pm))
                router[pm.method](pm.path, keys[pm]);
        return router;
    }

    readAll(req, res) {
        this.promiseHandler(res, this.service.readChunk(req.params));
    }

    read(req, res) {
        this.promiseHandler(res, this.service.readById(req.params.id));
    }

    create(req, res) {
        this.promiseHandler(res, this.service.create(req.body));
    }

    update(req, res) {
        this.promiseHandler(res, this.service.update(req.body));
    }

    del(req, res) {
        this.promiseHandler(res, this.service.delete(req.body.id));
    }

    block(req, res) {
        res.status(403).json(errors.accessDenied);
    }
};