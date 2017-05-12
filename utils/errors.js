'use strict';
const express = require('express');

express.response.error = function(error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).json(error);

    // TODO: log erorr + 'res.locals.trace'
};

module.exports = {
    invalidId: {
        message: 'Bad request',
        code: 'bad_request',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 404
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
        Unauthorized: {
        message: 'Invalid token',
        code: 'invalid_token',
        status: 401
    },
    PaymentRequired: {
        message: 'Payment Required',
        code: 'payment_equired',
        status: 402
    },
    PaymentDomainUse: {
        message: 'domain already use',
        code: 'domain_already_use',
        status: 500
    },
    CreateDomainExists: {
        message: 'domain already exists',
        code: 'domain_already_exists',
        status: 500
    }

};