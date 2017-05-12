'use strict';
const sinon = require('sinon');

let defaultValues = {
    successEmail: 'aa@mail.ru',
    failedEmail: 'aa2@mail.ru',
    password: '123',
    firstname: 'aaa',
    lastname: 'aaa',
    attributes: ['id', 'password'],
    ex: { ans: "some text to make test valid" },
    fullname: "aaa aaa"
};

let mainParams = {
    login: {
        success: {email: defaultValues.successEmail, password: defaultValues.password},
        failed: {email: defaultValues.failedEmail, password: defaultValues.password}
    },
    registrate: { 
        success: {email: defaultValues.successEmail, password: defaultValues.password, firstname: defaultValues.firstname, lastname: defaultValues.lastname},
        failed: {email: defaultValues.failedEmail, password: defaultValues.password, firstname: defaultValues.firstname, lastname: defaultValues.lastname}
    }
};

var findOne = sinon.stub();
findOne.withArgs({ where: { email: mainParams.login.success.email }, attributes: defaultValues.attributes })
.resolves({ id : 1, password: mainParams.login.success.password });

findOne.withArgs({ where: { email: mainParams.login.success.email }})
.resolves();

findOne.withArgs({ where: { email: mainParams.login.failed.email }, attributes: defaultValues.attributes })
.resolves();

findOne.withArgs({ where: { email: mainParams.login.failed.email }})
.resolves(defaultValues.ex);

var create = sinon.stub();
create.withArgs({ email: defaultValues.successEmail, password:defaultValues.password, fullname: defaultValues.fullname})
.resolves({ id : 1, password: mainParams.login.success.password });

create.withArgs({ email: defaultValues.failedEmail, password:defaultValues.password, fullname: defaultValues.fullname})
.resolves();

module.exports = {
    repository:{
        findOne : findOne,
        create: create
    },
    mainParams: mainParams
};