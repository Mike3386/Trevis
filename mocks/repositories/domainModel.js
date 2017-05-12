'use strict';
var randomstring = require("randomstring");
module.exports = class Domain{
    constructor () {
        let name = randomstring.generate({
                        length: Math.random()*5 + 5,
                        charset: 'alphabetic' });
        this.name = `aa${name}@mail.ru`;
        this.status = 'not paid';
    }
}