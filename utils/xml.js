'use strict';
module.exports = (req, res, next) => {
        res.sendData = function(obj) {
            let contentType = req.headers['content-type'];
            if (contentType === 'application/json') {
                res.header('Content-Type', 'application/json');
                res.send(obj);
            } else if (contentType === 'application/xml') {
                res.header('Content-Type', 'text/xml');
                let xml = serializer.render(obj);
                res.send(xml);
            }
            else res.send(obj);
        };
        next();
};