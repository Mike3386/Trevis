var defaultValues = {
    limit: 10,
    offset: 10,
    order: 'ASC',
    orderField: 'id',
    rows: ['a', 'b', 'c', 'd'],
    raw: true
}

var mainParams = {
    readChunk: {
        success: {},
        failed: {}
    },
    registrate: { 
        success: {},
        failed: {}
    }
}

var paramsAnsw = {
    findAndCountAll: [
        {
            param: { limit: defaultValues.limit, offset: defaultValues.offset, 
                order: [[defaultValues.orderField, defaultValues.order]], raw: defaultValues.raw},
            answer: { rows: defaultValues.rows, count:defaultValues.rows.count }
        },
        {
            param: { },
            answer: { }
        }
    ],
    create: [
        {
            param: { },
            answer: { }
        },
        {
            param: { },
            answer: { }
        }
    ]
}

function isObjectsEquals(d1,d2){
    return JSON.stringify(d1)===JSON.stringify(d2)
}

function execute(name, param){
    return new Promise((resolve, reject) => {
        let index = paramsAnsw[name].findIndex((a)=>isObjectsEquals(a.param, param));
        if (index >= 0) resolve(paramsAnsw[name][index].answer);
        else reject('bad parameter for ' + name + " : " + JSON.stringify(param));
    })
}

module.exports =
    {
        repository:{
            findOne : (param) => execute('name', param),
        },
        params: paramsAnsw,
        mainParams: mainParams
    };