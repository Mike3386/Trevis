'use strict';
let errors = require('../utils/messages');
let mock = require('../mocks/repositories/auth_sinon');
let authService = require('../services/auth')(mock.repository, errors);

describe('Service auth', () => {
    it('test - successfull login', async () => {
        let id = await authService.login(mock.mainParams.login.success);
        expect(id).toBe(1);
    })
});