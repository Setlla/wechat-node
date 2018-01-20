var wechatUtil = require('../services/wechatUtil.js');

//获取权限签名
function getTicket() {
	this.exec = function(route, req, res) {
		ticket(req, res);
	}
}

//
async function ticket(req, res) {
	var result = await wechatUtil.getTicket(req.params.url);
	res.send({
		isSuccess: true,
		result: result
	})
}

//通过code 获取微信基本用户信息
function getUserInfo() {
	this.exec = function(route, req, res) {
		getUser(req, res);
	}
}

async function getUser(req, res) {
	var result = await wechatUtil.getUserInfo(req.params.code);
	res.send({
		isSuccess: true,
		result: result.data
	})
}

module.exports = {
	getTicket: new getTicket(),
	getUserInfo: new getUserInfo()
}