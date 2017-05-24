'use strict';
const config = require('./config');
const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const EasyXml = require('easyxml');
const queryInt = require('express-query-int');
const serializer = new EasyXml(config.easyXml);
require('body-parser-xml')(bodyParser);

const errors = require('./utils/errors');
const dbcontext = require('./context/db')(Sequelize, config);

const userService = require('./services/user')(dbcontext.user, errors);
const authService = require('./services/auth')(dbcontext.user, errors);

const apiController = require('./controllers/api')(userService, authService, config);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(dbcontext.user, dbcontext.role, authService, config, errors);
const out = require('./utils/out')(serializer, errors);

module.exports = async () => {
    const app = express();

    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());
    app.use(bodyParser.xml(config.bodyXml));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(queryInt());
    app.use(auth);
    app.use(express.static('public'));

    app.use(out);
    /*app.use('/api', logger);
    app.use('/api', auth);
    app.use('/api', apiController);
    app.use('/api', xml);*/

    //dbcontext.role.create({name:'user'});
    //let user = await dbcontext.user.create({email:'aa@mail.ru', password: '123', firstname:'aa', lastname: 'bb', roleId:1})
//    let role = await dbcontext.role.findOne({where:{name:'user'}});
    return {dbcontext: dbcontext, app: app};
};