'use strict';
const SequelizeMock = require('sequelize-mock');
let dbMock = new SequelizeMock();
let errors = require('../utils/errors');
let mock = require('../mocks/repositories/base')(dbMock);
let bs = require('../services/base');
let baseService = new bs(mock, errors);

describe('Service base', () => {
    beforeAll(async () => {
        //await mock.create({text:"bb"});
        //await mock.create({text:"cc"});
    });

    it('read new ', async () => {
        //let a = await baseService.baseCreate({text:"aa"});
        //let b = await baseService.read(1);
        let b = await baseService.baseCreate({text:"aa"});
        let c = await baseService.read(b.get('id'));
        expect(b.get('text')).toEqual("aa");
        expect(c.get('text')).toEqual("aa");
    });
});