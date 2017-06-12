'use strict';

module.exports = (serializer, errors) => {
    return async (obj, req, res, next) => {
        let contentType = req.headers['content-type'];
        //res.header('Content-Type', contentType||'application/json');
        let status = obj.status || 200;
        switch(contentType){
            case 'application/json':
                res.status(status).json(obj.message||obj);
            break;
            case 'application/xml':
                res.header('Content-Type', 'text/xml');
                obj.message = serializer.render(obj.message);
                res.status(status).send(obj.message);
            break;
            default:
                res.status(status).json(obj.message||obj);
        }

    };
};