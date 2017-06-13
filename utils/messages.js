'use strict';
const express = require('express');

express.response.error = function (error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).json(error);
};

function Answer(text, status) {
    return {
        message: {
            text: text,
            code: text.replace(/\s+/g, '_').toLowerCase()
        },
        status: status
    }
}

function AnswerFull(text, code, status) {
    return {
        message: {
            text: text,
            code: code
        },
        status: status
    }
}

function AnswerError(error) {
    return {
        message: {
            //error: "Server error occurred"
            error
        },
        status: 500
    }
}

function InvalidParams(params) {
    let text = "";
    for(let i = 0; i<params.length; i++){
        text+="Invalid param " + params[i] + ";"
    }
    return AnswerFull(text, 'invalid_args', 400);
}

module.exports = {
    AnswerError,
    success: Answer('Success', 200),
    lowUserRole: Answer('Low user role', 403),
    badRequest: Answer('Bad request', 400),
    notFound: Answer('Entity not found', 404),
    wrongCredentials: Answer('Email or password are wrong', 404),
    accessDenied: Answer('Access denied', 403),
    Unauthorized: Answer('Invalid token', 401),
    PaymentRequired: Answer('Payment Required', 402),
    PaymentDomainUse: Answer('domain already use', 500),
    CreateDomainExists: Answer('domain already exists', 500),
    AlreadyExists: Answer('already exists', 400),
    InvalidParams,
    Answer
};