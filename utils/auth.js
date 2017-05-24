'use strict';
const privilages = require('../utils/privilages');

module.exports = (userRepository, roleRepository, authService, config, errors) => {
    return async (req, res, next) => {
        let userId = req.signedCookies[config.cookie.auth];
        let path = req.url;
        if(userId)
        {
            let user = await userRepository.findOne({where:{id:userId}});
            let role = await roleRepository.findOne({where:{id:user.dataValues.roleId}});
            let level = privilages.getRoleLevel(role.dataValues.name);
            if(level>=privilages.roles.GUEST) next();
            else next(errors.lowUserRole);

        }
        else next(errors.lowUserRole);
        return 0;
    };
};