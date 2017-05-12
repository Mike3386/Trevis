let defaultValues = {

}

let mainParams = {
    login: {
        success: {},
        failed: {}
    },
    registrate: { 
        success: {},
        failed: {}
    }
}

let paramsAnsw = {
    findOne: [
        {
            
        },
        {
            
        }
    ],
    create: [
        {

        },
        {
            
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
        repositoryAuth:{
            findOne : (param) => execute('name', param),
        },
        params: paramsAnsw,
        mainParams: mainParams
    };