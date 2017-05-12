'use strict';
const jwt = require('jsonwebtoken');
var request = require('request');
var Promise = require("bluebird");
const errors = require("../utils/errors");
module.exports = (domainRepository, userRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(DomainService.prototype, BaseService.prototype);

    function DomainService(domainRepository, errors) {
        BaseService.call(this, domainRepository, errors);

        let self = this;

        self.create = create;
        self.update = update;
        self.check = check;
        self.pay = pay;

        function create(domainName) {
            return new Promise((resolve, reject) => {
                let domain = {
                    name: domainName,
                    status: "not paid"
                };
                domainRepository.find({where:{name:domainName}}).then((domain1)=>{
                    if(!domain1)
                    return self.baseCreate(domain);
                    else resolve(errors.CreateDomainExists);
                }).then((domain2) => {
                        resolve(domain2)
                    }).catch((err)=>reject(err));
            });
        }

        function update(data) {
            return new Promise((resolve, reject) => {
                let post = {
                    title: data.title,
                    content: data.content,
                    date: data.date,
                    draft: data.draft
                };

                self.baseUpdate(data.id, post)
                    .then(resolve).catch(reject);
            });
        }

        function check(domain) {
            return new Promise((resolve, reject) => {
                request({
                    headers: {
                        'Origin': 'https://www.namecheap.com/',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    uri: 'https://api.domainr.com/v2/status?domain=' + domain + '&client_id=fb7aca826b084569a50cfb3157e924ae',
                    method: 'get'
                }, function (err, response, body) {
                    body = JSON.parse(body);
                    if(body.errors) resolve({status: errors.message});
                    else if (((body.status[0].summary === "inactive") || (body.status[0].summary === "undelegated"))) {
                        domainRepository.findAll(
                            {
                                where: {name: domain}
                            })
                            .then((domain) => {
                                if (domain.length != 0) 
                                    resolve({status: "domain already use"})
                                else
                                    resolve({status: "domain free"})
                            })
                            .catch(reject);
                    }
                    else if ((body.status[0].summary === "active") || (body.status[0].summary === "registrar")) {
                        resolve({status: "domain already use"})
                    }
                })
            })
        }

        function pay(id, tokenUserId) {
            return new Promise((resolve, reject) => {

                if (tokenUserId) {
                    jwt.verify(tokenUserId, 'shhhhh', function (err, decoded) {
                        if (err != null) reject(errors.Unauthorized);
                        else {
                            var userId = decoded.__user_id;
                            id = parseInt(id);
                            var domain = {
                                status: "paid"
                            };
                            Promise.all([
                                domainRepository.findById(id),
                                userRepository.findById(userId)
                            ]).spread((dmn, user) => {
                                if (dmn.dataValues.status == "paid")
                                    reject(errors.PaymentDomainUse);
                                else {
                                return Promise.all([
                                    user.addDomain(dmn),
                                    user.decrement({cache: 20}),
                                    self.baseUpdate(dmn.dataValues.id, {
                                        name: dmn.dataValues.name,
                                        status: "paid"
                                    })
                                ]);
                                }
                            }).spread((domain, user, dmn) => {
                                if (user.dataValues.cache - 20 < 0) reject(errors.PaymentRequired)
                                resolve({success: true})
                            });
                        }
                    })
                }
                else {
                    reject(errors.Unauthorized)
                }
            });
        }
    }

    return new DomainService(domainRepository, errors);
};