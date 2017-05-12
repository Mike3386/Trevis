'use strict';
const express = require('express');
const EasyXml = require('easyxml');
const jwt = require('jsonwebtoken');

const serializer = new EasyXml({
    singularizeChildren: true,
    underscoreAttributes: true,
    rootElement: 'response',
    dateFormat: 'SQL',
    indent: 2,
    manifest: true
});
module.exports = (authService, config) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        authService.login(req.body)
            .then((userId) => {
                let token = jwt.sign({ __user_id: userId }, 'shhhhh');
                res.cookie('x-access-token',token);
                //res.json({ success: true });
                SendByHandle({success: true, token:token}, req, res);
            })
            .catch((err) => res.error(err));
    });

    router.put('/', (req, res) => {
        authService.register(req.body)
            .then((user) =>  SendByHandle(user, req, res))
            .catch((err) => res.error(err));
    });

    router.get('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.json({ success: true });
    });

    return router;
};

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