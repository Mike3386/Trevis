'use strict';
let errors = require('../utils/errors');
let mock = require('../mocks/repositories/baseMock');
let baseRep = new mock();
let base = require('../services/base');
let baseService = new base(baseRep, errors);

describe('Service base', () => {
    beforeAll(async () => {
        await baseService.baseCreate({text:"b"});
        await baseService.baseCreate({text:"c"});
        await baseService.baseCreate({text:"d"});
    });

    it('baseCreate ', async () => {
        let elem = await baseService.baseCreate({text:"a"});
        expect(elem).toEqual({id:3, text:"a"});
    });

    it('read id ', async () => {
        let elem = await baseService.read(2);
        expect(elem).toEqual({id:2, text:"d"});
    });

    it('delete', async () => {
        let elem = await baseService.delete(1);
        expect(elem).toEqual({success: true});
        expect(baseService.read(1)).toThrow();
    });

    it('update', async () => {
        let elems = await baseService.baseUpdate(2, {text:"ff"});
        expect(elems[0]).toEqual(1);
        let elem = await baseService.read(2);
        expect(elem.text).toEqual("ff");
    });

    it('readChunk', async () => {
        let items = await baseService.readChunk();
        expect(items.data.length).toEqual(3);
    })
});