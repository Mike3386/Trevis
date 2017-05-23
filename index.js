const application = require('./app')();

application.then((sysApp)=> sysApp.dbcontext.sequelize.sync().then(()=>
    sysApp.app.listen(process.env.PORT||3000, () => console.log('Started'))
))
.catch(console.log);

