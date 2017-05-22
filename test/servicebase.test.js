'use strict';
let errors = require('../utils/errors');
let baseMock = require('../mocks/repositories/baseMock');
let domainMock = require('../mocks/repositories/domainMock');
let userMock = require('../mocks/repositories/userMock');
let baseRepMock = new baseMock();
let domainRepMock = new domainMock();
let userRepMock = new userMock();
let base = require('../services/base');
let baseService = new (require('../services/base'))(baseRepMock, errors);
let domainService = require('../services/domain')(domainRepMock, userRepMock, errors);

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
        let elem = await baseService.read(2);
        expect(elem).toEqual({id:2, text:'d'});
    });

    it('delete', async () => {
        let elem = await baseService.delete(1);
        expect(elem).toEqual({success: true});
        expect(baseService.read(1)).toThrow();
    });

    it('update', async () => {
        let elements = await baseService.baseUpdate(2, {text:'ff'});
        expect(elements[0]).toEqual(1);
        let elem = await baseService.read(2);
        expect(elem.text).toEqual('ff');
    });

    it('readChunk', async () => {
        let items = await baseService.readChunk();
        expect(items.data.length).toEqual(3);
    })
});

describe('Service domains', () =>{
    beforeAll(() => {
        mock('request', function (parms, callback){
            if(parms)
                callback(null, null,{
                    status: [
                        {
                            domain: "kufiks.com",
                            zone: "com",
                            status: "undelegated inactive",
                            summary: "inactive"
                        }
                    ]
                });
        });
        /*
         mock('request', function (parms, callback){
         if(parms)
         callback(null, null, {
         status: [
         {
         domain: "google.com",
         zone: "com",
         status: "active registrar",
         summary: "registrar"
         }
         ]
         });
         });*/
    });

    it('create', async () => {
        let domain = await domainService.create('aa');
        expect(domain.name).toEqual('aa');
    });

    it('update', async () => {
        await domainService.create('ии');
        let domain = await domainService.update({id:1, name:"ии", status : 'multy paid'});
        expect(domain[1][0].status).toEqual('multy paid');
    });

    it('check', async () => {
        try{
            let domain = await domainService.check('kufiks.com');
        }catch (err){
            console.log(err);
        }
        //expect(domain).toEqual({status: "domain already use"});
        expect(domain).toEqual({status: "domain free"});
    });
});