'use strict';
const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('body-parser-xml')(bodyParser);
const EasyXml = require('easyxml');
const queryInt = require('express-query-int');

const errors = require('./utils/errors');
const config = require('./config');
const serializer = new EasyXml(config.easyXml);

const dbcontext = require('./context/db')(Sequelize, config);

const domainService = require('./services/domain')(dbcontext.domain, dbcontext.user, errors);
const userService = require('./services/user')(dbcontext.user, errors);
const authService = require('./services/auth')(dbcontext.user, errors);
const cacheService = require('./services/cache');

const apiController = require('./controllers/api')(domainService, userService, authService, cacheService, config);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(authService, config, errors);
const cache = require('./utils/cache')(cacheService);
const xml = require('./utils/xml');

const app = express();

app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.xml(config.bodyXml));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(queryInt());

app.use('/api', logger);
app.use('/api', auth);
app.use('/api', cache);
app.use('/api', apiController);

app.use('/api', xml);

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(proccess.env.PORT||3000, () => console.log('Running on http://localhost:3000'));
    })
    .catch((err) => console.log(err));