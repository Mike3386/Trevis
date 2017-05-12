'use strict';
const jwt = require('jsonwebtoken');
const EasyXml = require('easyxml');

const serializer = new EasyXml({
    singularizeChildren: true,
    underscoreAttributes: true,
    rootElement: 'response',
    dateFormat: 'SQL',
    indent: 2,
    manifest: true
});
module.exports = (domainService, cacheService, config, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(DomainController.prototype, BaseController.prototype);

    function DomainController(domainService, promiseHandler) {
        BaseController.call(this, domainService, promiseHandler);

        this.routes['/'] = [{method: 'get', cb: readAll}, {method: 'post', cb: registerDomain}];
        this.routes['/:id'] = [{method: 'put', cb: pay}, {method: 'get', cb: readById}];
        this.routes['/avaliable/:domain'] = [{method: 'get', cb: check}];
        // this.routes['/pay'] = [];

        this.registerRoutes();

        return this.router;

        function SendByHandle(data, req, res){
                let contentType = req.headers['content-type'];
                if (contentType == 'application/json') {
                    res.header('Content-Type', 'application/json');
                    res.send(data);
                } else if (contentType == 'application/xml') {
                    res.header('Content-Type', 'text/xml');
                    let xml = serializer.render(data.dataValues || data);
                    res.send(xml);
                } else {
                    res.send(data);
                }
        }

        function registerDomain(req, res) {
            domainService.create(req.body.domain).then((data) => {
                SendByHandle(data, req, res);
            })
                .catch((err) => res.error(err));

        }

        function readAll(req, res) {
            domainService.readChunk(req.query)
                .then((domains) => {
                    cacheService.set(req, domains);
                    SendByHandle(domains, req, res);
                })
                .catch((err) => res.error(err));
        }

        function readById(req, res) {
            domainService.read(req.params.id)
                .then((data) => {
                    SendByHandle(data, req, res);
                })
                .catch((err) => res.error(err));


        }

        function check(req, res) {
            domainService.check(req.params.domain)
                .then((data) => {
                    SendByHandle(data, req, res);
                })
                .catch((err) => res.error(err));
        }

        function pay(req, res) {
            domainService.pay(req.params.id, req.body.token)
                .then((data) => {
                    SendByHandle(data, req, res);
                })
                .catch((err) => res.error(err));
        }
    }

    return new DomainController(domainService, promiseHandler);
};