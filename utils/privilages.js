const roles = {
    GUEST: 0,
    USER: 1,
    ADMIN: 4
};

const getRoleLevel = (role) => {
    let level;
    switch (role) {
        case 'guest':
            level = roles.GUEST;
            break;
        case 'user':
            level = roles.USER;
            break;
        case 'admin':
            level = roles.ADMIN;
            break;
        default:
            level = roles.GUEST;
    }
    return level;
};

const getLowestLevelForUrl = (url) => {
    let arr = urls.filter((elem) => new RegExp(elem.pattern).test(url));
    if (arr.length === 0) return roles.USER;
    else return arr[0].level;
};

const urls = [
    {
        pattern: '^\/$',
        level: roles.GUEST
    },
    {
        pattern: '^\/index$',
        level: roles.GUEST
    },
    {
        pattern: '^\/js\/',
        level: roles.GUEST
    },
    {
        pattern: '^\/register$',
        level: roles.GUEST
    },
    {
        pattern: '^\/api\/sessions$',
        level: roles.GUEST
    },
    {
        pattern: '^\/api\/',
        level: roles.USER
    }
];

module.exports = {
    roles,
    urls,
    getRoleLevel,
    getLowestLevelForUrl
};