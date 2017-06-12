'use strict';
const privilages = require('../utils/privilages');
const messages = require('../utils/messages');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (userRepository, roleRepository, authService) => {
    return async (req, res, next) => {
        let decoded;
        let level;
        let userId;
        if(req.cookies[config.cookie.key])
            userId = req.cookies[config.cookie.key];

        try{
            decoded = jwt.verify(userId, config.jwt.key);
        }
        catch(e){}

        if(decoded!==null && decoded!==undefined) userId = decoded.__user_id;
        let path = req.url;

        if(userId!==null && userId!==undefined)
        {
            let user = await userRepository.findOne({where:{id:userId}});
            let role = await roleRepository.findOne({where:{id:user.dataValues.roleId}});
            level = privilages.getRoleLevel(role.dataValues.name);
        }
        else level = privilages.roles.GUEST;

        if(userId)req.userId = userId;

        if(level>=privilages.getLowestLevelForUrl(req.url)) next();
        else next(messages.lowUserRole);

        return 0;
    };
};