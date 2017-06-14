'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (messageService, userService, relService, groupService) => {
    const BaseController = require('./base_class');

    class MessageController extends BaseController {
        constructor(serviceM, serviceU, serviceR, groupService) {
            super(serviceM);
            this.userService = serviceU;
            this.relService = serviceR;
            this.groupService = groupService;
            this.routes = {};
            this.setRoute('/users/:id', 'get', this.readUsers);
            this.setRoute('/groups/:id', 'get', this.readGroups);
            this.setRoute('/users/:id', 'post', this.createUsers);
            this.setRoute('/groups/:id', 'post', this.createGroup);
        }

        async readUsers(req, res, next){
            if(req.params.id == null || !await this.userService.isExist(req.params.id)) {
                next(message.InvalidParams(['id']));
                return;
            }
            let data;
            this.service.setReadedUser(req.query.limit||10, req.query.page||1, req.params.id, req.userId);
            data = await this.service.readChunk(
                {
                    where:{
                        $or:[
                            {
                                $and:{
                                    receiverIdUser: req.userId,
                                    senderId: req.params.id
                                }
                            },
                            {
                                $and:{
                                    receiverIdUser: req.params.id,
                                    senderId: req.userId
                                }
                            }
                        ]
                    },
                    limit:req.query.limit||10,
                    page: req.query.page||1
                }
            );

            next(data);
        }

        async readGroups(req, res, next){
            if(req.params.id == null || !await this.groupService.isExist(req.params.id)) {
                next(message.InvalidParams(['id']));
                return;
            }

            if((await this.relService.readChunk({where:{$and:[{userId:req.userId}, {groupId:req.params.id}]}})).data.length===0){
                next(message.InvalidParams(['id']));
                return;
            }

            let data;
            this.service.setReadedGroup(req.query.limit||10, req.query.page||1, req.userId, req.params.id);
            data = await this.service.readChunk(
                {
                    where:{
                        $or:[
                            {
                                receiverIdGroup: req.userId
                            },
                            {
                                receiverIdGroup: req.params.id
                            }
                        ]
                    },
                    limit:req.query.limit||10,
                    page: req.query.page||1
                }
            );

            next(data);
        }

        async createUsers(req, res, next) {
            if(req.params.id == null || !await this.userService.isExist(req.params.id)) {
                next(message.InvalidParams(['id']));
                return;
            }

            if(req.body.text == null) {
                next(message.InvalidParams(['text']));
                return;
            }

            req.body = {
                text: req.body.text,
                senderId: req.userId,
                receiverIdUser: req.params.id
            };
            let data = await this.service.baseCreate(req.body);
            next(message.success);
        }

        async createGroup(req, res, next) {
            if(req.params.id == null || !await this.groupService.isExist(req.params.id)) {
                next(message.InvalidParams(['id']));
                return;
            }

            if(req.body.text == null) {
                next(message.InvalidParams(['text']));
                return;
            }

            if((await this.relService.readChunk({where:{$and:[{userId:req.userId}, {groupId:req.params.id}]}})).data.length===0){
                next(message.InvalidParams(['id']));
                return;
            }

            req.body = {
                text: req.body.text,
                senderId: req.userId,
                receiverIdGroup: req.params.id
            };
            let data = await this.service.baseCreate(req.body);
            next(message.success);
        }
    }

    return new MessageController(messageService, userService, relService, groupService);
};