'use strict';
const util = require('util');
const message = require('../utils/messages');
module.exports = (groupService, relService) => {
    const BaseController = require('./base_class');

    class GroupController extends BaseController {
        constructor(service, relService) {
            super(service);
            this.relService = relService;
            //this.setRoute('/', 'post', this.create);
            this.setRoute('/:id/members', 'post', this.join);
            this.setRoute('/:id/members', 'get', this.readMembers);
            this.setRoute('/:id/members', 'delete', this.deleteMember);

        }

        async create(req, res, next) {
            if(req.body.name === null) next(message.Answer('Bad name', 400));
            else {
                req.body = {
                    name: req.body.name
                };
                let ex = await this.service.repository.find({where:{
                    name: req.body.name
                }});

                if(ex) next(message.AlreadyExists);
                else {
                    let data = await this.service.baseCreate(req.body);

                    let body = {
                        groupId: data.id,
                        userId: req.userId,
                    };

                    data = await this.relService.baseCreate(body);
                    next(message.success);
                }
            }
        }

        async del(req, res, next) {
            if(req.params.id == null || !await this.service.isExist(req.params.id))next(message.InvalidParams(['id']));
            else {
                let rels = await this.relService.readChunk({
                    where:{
                        groupId:req.params.id
                    }});
                if(rels.data.length === 0){
                    let data = await this.service.baseDelete(req.params.id);
                    if(data===1)
                        next(message.success);
                    else next(message.Answer('Cant delete this group', 500));
                }
                else next(message.Answer('Group is not free', 500));
            }
        }

        async deleteMember(req, res, next) {
            if(req.params.id == null || !await this.service.isExist(req.params.id))next(message.InvalidParams(['id']));
            else {
                let rels = await this.relService.readChunk({
                    where:{
                        groupId:req.params.id,
                        userId:req.userId
                    }});

                if(rels.data.length === 1){
                    let data = await this.relService.baseDelete(rels.data[0].id);
                    if(data===1)
                        next(message.success);
                    else next(message.Answer('Cant delete this rel', 500));
                }
                else next(message.Answer('Not in this group', 500));
            }
        }

        async join(req, res, next) {
            if(req.params.id == null || !await this.service.isExist(req.params.id))next(message.InvalidParams(['id']));
            else {
                let body = {
                    groupId: req.params.id,
                    userId: req.userId,
                };
                let ex = await this.relService.readChunk({where:{
                    groupId: req.params.id,
                    userId: req.userId}});
                if (ex.data.length!==0) next(message.Answer('Already in this group', 500));
                else {
                    await this.relService.baseCreate(body);
                    next(message.success);
                }
            }
        }

        async readMembers(req, res, next) {
            if(req.params.id == null || !await this.service.isExist(req.params.id)) next(message.InvalidParams(['id']));
            else {
                let data = await this.service.readById(req.params.id);
                let rels = await this.relService.readChunk({where:{
                    groupId:data.id
                },
                    limit:req.query.limit||10,
                    page: req.query.page||1
                });
                next(rels);
            }
        }
    }


    return new GroupController(groupService, relService);
};