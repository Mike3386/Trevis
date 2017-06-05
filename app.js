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

const dbcontext = require('./context/db')(Sequelize, (process.env.DEV)?config.dbPostgres:config.dbMysql);

const userService = require('./services/user')(dbcontext.user);
const authService = require('./services/auth')(dbcontext.user);

const apiController = require('./controllers/api')(userService, authService);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(dbcontext.user, dbcontext.role, authService);
const out = require('./utils/out')(serializer);
const bodyParams = require('./utils/bodyParams')();

module.exports = async () => {
    const app = express();

    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());
    app.use(bodyParser.xml(config.bodyXml));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(queryInt());
    app.use(bodyParams);
    app.use(auth);
    app.use(express.static('public'));

    /*
    Main api part
     */
    app.use('/api', apiController);

    /*
    End of main api part
     */
    app.use(out);
    /*app.use('/api', logger);
    app.use('/api', auth);
    app.use('/api', xml);*/

    //dbcontext.role.create({name:'user'});
    //let user = await dbcontext.user.create({email:'aa@mail.ru', password: '123', firstname:'aa', lastname: 'bb', roleId:1})
//    let role = await dbcontext.role.findOne({where:{name:'user'}});
    return {dbcontext: dbcontext, app: app};
};