'use strict';
const express = require('express');

module.exports = class BaseController {
    constructor(service, promiseHandler) {
        this.router = express.Router();

        this.router.get('/', (req, res) => this.readAll(req, res));
        this.router.post('/', (req, res) => this.create(req, res));
        this.router.put('/', (req, res) => this.update(req, res));
        this.router.get('/:id', (req, res) => this.read(req, res));
        this.router.delete('/:id', (req, res) => this.del(req, res));

        this.service = service;
        this.promiseHandler = promiseHandler;
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
};