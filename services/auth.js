'use strict';
module.exports = (userRepository, errors) => {
    return {
        login: login,
        register: register,
    };

    function login(data) {
        return new Promise((resolve, reject) => {
            userRepository
                .findOne({ where: { email: data.email }, attributes: ['id', 'password'] })
                .then((user) => {
                    if (user == null || user.password !== data.password) {
                        reject(errors.wrongCredentials);
                        return;
                    }
                    resolve(user.id);
                })
                .catch(reject);
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            let user = {
                email: data.email,
                password: data.password,
                fullname: data.firstname + " " + data.lastname,
            };
            userRepository.findOne({ where: { email: user.email }}).
            then((data)=>{
                if(data==null) return userRepository.create(user);
                else return null;
            }).then((data) => resolve({ success: (data!=null)?true:false }))
                .catch(reject);
        });
    }

};