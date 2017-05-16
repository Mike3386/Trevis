module.exports = (Sequelize) => {
    var BaseMock = Sequelize.define('base', {
            text: Sequelize.STRING
    });
    return BaseMock;
};