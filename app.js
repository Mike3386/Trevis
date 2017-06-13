'use strict';
const config = require('./config');
const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const EasyXml = require('easyxml');
const queryInt = require('express-query-int');
const serializer = new EasyXml(config.easyXml);
const expValidator = require('express-validator');
require('body-parser-xml')(bodyParser);
const session = require('express-session');

const dbcontext = require('./context/db')(Sequelize, (process.env.DEV)?config.dbPostgres:config.dbMysql);

const userService = require('./services/user')(dbcontext.user);
const authService = require('./services/auth')(dbcontext.user);
const messageService = require('./services/message')(dbcontext.message);
const groupService = require('./services/group')(dbcontext.group);
const relService = require('./services/participants')(dbcontext.participant);

const apiController = require('./controllers/api')(userService, authService, messageService, groupService, relService);

const logger = require('./utils/logger');
const auth = require('./utils/auth')(dbcontext.user, dbcontext.role, authService);
const out = require('./utils/out')(serializer);
const bodyParams = require('./utils/bodyParams')();
const jade = require('./utils/jade')(userService);

module.exports = async () => {
    const app = express();

    app.set('view engine', 'jade');
    //res.render('index', { title: 'Hey', message: 'Hello there!'});
    app.set('trust proxy', 1);
    app.use(session({
        secret: 'scr',
        name: 'scrcook',
        resave: true,
        saveUninitialized: true}));
    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());
    app.use(bodyParser.xml(config.bodyXml));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(queryInt());
    app.use(bodyParams);
    app.use(expValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
                , root    = namespace.shift()
                , formParam = root;

            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param : formParam,
                msg   : msg,
                value : value
            };
        }
    }));
    app.use(auth);
    app.use('/:name', jade);
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
    //let role = await dbcontext.role.findOne({where:{name:'user'}});

    return {dbcontext: dbcontext, app: app};
};