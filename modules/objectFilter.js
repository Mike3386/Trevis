module.exports = function (obj, options) {
    let outObject = {};

    let atrArr = Object.keys(obj).map(key => [key, obj[key]]);
    let newAtrArr = atrArr.filter(
        elem => (options.findIndex(arrElem => arrElem === elem[0]) !== -1)
    );

    for (let i = 0; i < newAtrArr.length; i++) outObject[newAtrArr[i][0]] = newAtrArr[i][1];

    return outObject;
};