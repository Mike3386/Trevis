'use strict';

let Base = require("./baseMock");

class UserMock extends Base {
    isEqualCreate(a, b) {
        return a.email === b.email;
    }

    isEqualFindOne(a, opt) {
        return a.name === opt.where.name;
    }
}

module.exports = UserMock;