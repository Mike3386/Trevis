'use strict';

module.exports = (serializer, errors) => {
    return async (obj, req, res, next) => {
        let contentType = req.headers['content-type'];
        let status = obj.status || 200;
        switch(contentType){
            case 'application/json':
                res.status(status).json(obj);
            break;
            case 'application/xml':
                res.header('Content-Type', 'text/xml');
                obj = serializer.render(obj);
                res.status(status).send(obj);
            break;
            default:
                res.status(status).json(obj);
        }

    };
};