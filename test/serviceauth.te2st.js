'use strict';
let errors = require('../utils/errors');
let mock = require('../mocks/repositories/auth_sinon');
let authService = require('../services/auth')(mock.repository, errors);

describe('Service auth', () => {
    it('test - successfull login', async () => {
        let id = await authService.login(mock.mainParams.login.success);
        expect(id).toBe(1);
    })

    it('test - failed login', async () => {
        //authService.login(mock.mainParams.login.failed).rejects;
        let success = false;
        try {
            let id = await authService.login(mock.mainParams.login.failed);
        }
        catch(err){
            expect(err).toHaveProperty('code', 'wrong_credentials');//.toBe({'code': 'wrong_credentials', 'message': 'Email or password are wrong', 'status': 404});
            success = true;
        }
        if (!success) throw 'Login successfull';
    })

    it('test - successfull register', async () => {
        let ans = await authService.register(mock.mainParams.registrate.success);
        expect(ans.success).toBe(true);    
    })

    it('test - failed register', async () => {
        let ans = await authService.register(mock.mainParams.registrate.failed);
        expect(ans.success).toBe(false);    
    })
});