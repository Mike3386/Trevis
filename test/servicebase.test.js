'use strict';
let errors = require('../utils/messages');
let baseMock = require('../mocks/repositories/baseMock');
let domainMock = require('../mocks/repositories/domainMock');
let userMock = require('../mocks/repositories/userMock');
let baseRepMock = new baseMock();
let domainRepMock = new domainMock();
let userRepMock = new userMock();
let base = require('../services/base');
let baseService = new (require('../services/base'))(baseRepMock, errors);
let domainService = require('../services/group')(domainRepMock, userRepMock, errors);

const mock = require('mock-require');

describe('Service base', () => {
    beforeAll(async () => {
        await baseService.baseCreate({text:'b'});
        await baseService.baseCreate({text:'c'});
        await baseService.baseCreate({text:'d'});
    });

    it('baseCreate ', async () => {
        let elem = await baseService.baseCreate({text:'a'});
        expect(elem).toEqual({id:3, text:'a'});
    });

    it('read id ', async () => {
        let elem = await baseService.readById(2);
        expect(elem).toEqual({id:2, text:'d'});
    });

    it('delete', async () => {
        let elem = await baseService.baseDelete(1);
        expect(baseService.readById(1)).toThrow();
    });

    it('update', async () => {
        let elements = await baseService.baseUpdate(2, {text:'ff'});
        expect(elements[0]).toEqual(1);
        let elem = await baseService.readById(2);
        expect(elem.text).toEqual('ff');
    });

    it('readChunk', async () => {
        let items = await baseService.readChunk();
        expect(items.data.length).toEqual(3);
    })
});