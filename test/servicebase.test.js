'use strict';
let errors = require('../utils/errors');
let mock = require('../mocks/repositories/baseMock');
let baseRep = new mock();
let bs = require('../services/base');
let baseService = new bs(baseRep, errors);
describe('Service base', () => {
    it('test - read failed', async () => {
        try {
            let obj = await baseService.read(4);
        }
        catch (err){
            console.log(err);
            expect(err).toEqual(errors.notFound);
        }
    })
});