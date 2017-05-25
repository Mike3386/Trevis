'use strict';

module.exports = () => {
    return async (obj, req, res, next) => {
        let params = {};
        let contentType = req.headers['content-type'];
        if('application/xml'===contentType)
            for (let key in req.body.keys())
                Object.assign(params, req.body[key]);
        req.body = params;
        next();
    };
};