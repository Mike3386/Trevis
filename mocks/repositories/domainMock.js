'use strict';

let Base = require("./baseMock");

class DomainMock extends Base {
    isEqualCreate(a, b) {
        return a.name === b.name;
    }

    isEqualFindOne(a, opt) {
        return a.name === opt.where.name;
    }
}

module.exports = DomainMock;