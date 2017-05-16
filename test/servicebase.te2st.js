'use strict';
let errors = require('../utils/errors');
let mock = require('../mocks/repositories/baseMock');
let baseRep = new mock();
let bs = require('../services/base');
let baseService = new bs(baseRep, errors);

describe('Service base', () => {
    beforeAll(async () => {
        await baseService.baseCreate({a:"a"});
        await baseService.baseCreate({a:"b"});
        await baseService.baseCreate({a:"c"});
        await baseService.baseCreate({a:"d"});
    })

    it('read new ', async () => {
        let obj = true;
        try{
            obj = await baseService.read(7);
        }catch(err){
            obj = false
        };
        let obj2 = await baseService.read(2);
        expect(obj).toBeFalsy();
        expect(obj2).toEqual({a:"c"});
    })

    it('create', async () => {
        let obj = await baseService.baseCreate({g:"g"});
    })
});