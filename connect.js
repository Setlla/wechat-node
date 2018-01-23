const Sequelize=require("sequelize");

var sequelize = new Sequelize('wechat', 'root', '123456', {
	host: '120.78.76.172',
	dialect: 'mysql'
});

module.exports=sequelize;