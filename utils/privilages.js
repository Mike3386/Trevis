const roles = {
  GUEST: 0,
  USER: 1,
  ADMIN: 4
};

const getRoleLevel = (role) => {
  let level;
  switch(role){
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

const urls = [
    {
        pattern: '^\/$',
        level: roles.GUEST
    },
    {
        pattern: '^\/api\/$',
        level: roles.USER
    }
];

module.exports = {
  roles,
  urls,
  getRoleLevel
};