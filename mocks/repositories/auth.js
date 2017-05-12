let defaultValues = {
    successEmail: 'aa@mail.ru',
    failedEmail: 'aa2@mail.ru',
    password: '123',
    firstname: 'aaa',
    lastname: 'aaa'
}

let mainParams = {
    login: {
        success: {email: defaultValues.successEmail, password: defaultValues.password},
        failed: {email: defaultValues.failedEmail, password: defaultValues.password}
    },
    registrate: { 
        success: {email: defaultValues.successEmail, password: defaultValues.password, firstname: defaultValues.firstname, lastname: defaultValues.lastname},
        failed: {email: defaultValues.failedEmail, password: defaultValues.password, firstname: defaultValues.firstname, lastname: defaultValues.lastname}
    }
}

let paramsAnsw = {
    findOne: [
        {
            param: { where: { email: mainParams.login.success.email }, attributes: ['id', 'password'] },
            answer: { id : 1, password: mainParams.login.success.password }
        },
        {
            param: { where: { email: mainParams.login.success.email }},
            answer: null
        },
        {
            param: { where: { email: mainParams.login.failed.email }, attributes: ['id', 'password']  },
            answer: null
        },
        {
            param: { where: { email: mainParams.login.failed.email }},
            answer: { ans: "some text to make test valid" }
        }
    ],
    create: [
        {
            param: { email: defaultValues.successEmail, password:defaultValues.password, fullname:"aaa aaa" },
            answer: { id : 1, password: mainParams.login.success.password }
        },
        {
            param: { email: defaultValues.failedEmail, password:defaultValues.password, fullname:"aaa aaa"},
            answer: null
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
        else reject('bad param for ' + name + " : " + JSON.stringify(param));
    })
}

module.exports =
    {
        repository:{
            findOne : (param) => execute('findOne', param),
            create: (param) => execute('create', param)
        },
        params: paramsAnsw,
        mainParams: mainParams
    };