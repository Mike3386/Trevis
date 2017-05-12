'use strict';
const sinon = require('sinon');

let defaultValues = {
    options: {
            limit: 10,
            page: 1,
            order: 'asc',
            orderField: 'id'
        },
    offset: 0,
    rows: ['a', 'b', 'c', 'd'],
    raw: true,
    id: 1,
    someThatNeedToUseAsParam:{
        aa:"aa",
        bb:"bb"
    },
    someThatNeedToResolve:{
        aa:"aa",
        bb:"bb"
    }
};

let mainParams = {
    readChunk: {
        success: defaultValues.options,
        failed: {}
    },
    read: {
        success: defaultValues.id,
        failed: {}
    },
    baseCreate: {
        success: defaultValues.someThatNeedToUseAsParam,
        failed: {}
    },
    del: {
        success: defaultValues.someThatNeedToUseAsParam,
        failed: {}
    }
};

var findAndCountAll = sinon.stub();
findAndCountAll.withArgs({limit: defaultValues.options.limit, offset: defaultValues.offset, 
    order: [[defaultValues.options.orderField, defaultValues.options.order]], raw: defaultValues.raw})
.resolves({ rows: defaultValues.rows, count:defaultValues.rows.count });

var findById = sinon.stub();
findById.withArgs(defaultValues.id, {raw:true})
.resolves(defaultValues.someThatNeedToResolve);

var create = sinon.stub();
create.withArgs(defaultValues.someThatNeedToUseAsParam)
.resolves(defaultValues.someThatNeedToResolve);

var destroy = sinon.stub();
destroy.withArgs({where: {id: defaultValues.id}})
.resolves();

module.exports = {
    repository:{
        findAndCountAll: findAndCountAll,
        findById: findById,
        create: create, 
        destroy: destroy
    },
    mainParams: mainParams
};