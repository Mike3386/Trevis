'use strict';
const path = require('path');
const appDir = path.dirname(require.main.filename);
const fs = require('fs');
const bluebird = require('bluebird');
bluebird.promisifyAll(fs);

module.exports = () => {
    return async (req, res, next) => {
        try{
            await fs.accessAsync(appDir + '/views/' + req.params.name + '.jade', fs.constants.R_OK);
            res.render('../views/' + req.params.name);
        }
        catch(err) {
            next();
        }

        return;
    };
};