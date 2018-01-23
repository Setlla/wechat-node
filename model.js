const Sequelize = require("sequelize");
const sequelize = require("./connect.js");

//个人中心接口
var user = sequelize.define('user', {
	openid: Sequelize.STRING,
	name: Sequelize.STRING,
	totalmoney: Sequelize.STRING,
	headimage: Sequelize.STRING,
	totalnum: Sequelize.INTEGER
});

//红包列表接口
var redpacket = sequelize.define('redpacket', {
	userid: Sequelize.INTEGER,
	openid: Sequelize.STRING,
	nickname: Sequelize.STRING,
	headimage: Sequelize.STRING,
	sex: Sequelize.STRING,
	money: Sequelize.STRING
});


var models = {
	user: user,
	redpacket: redpacket
}

module.exports = models;