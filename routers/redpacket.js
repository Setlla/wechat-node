const redpacket = require('../model.js').redpacket;
const userUtil = require('../services/userUtil.js');
const redpacketUtil = require('../services/redpacketUtil.js');

//获取红包金额
function getOnePacket() {
	this.exec = function(route, req, res) {
		getOne(req, res);
	}
}

async function getOne(req, res) {
	let data = req.body;

	//获取红包前判断权限  post请求  参数 当前用户id和当前抢红包的用户openid
	let result = await redpacketUtil.isAuth(data.userid, data.openid);

	if(!result) {
		let money = (Math.random() * 5).toFixed(2);
		//存入redpacket

		let _redpacket = await redpacket.create({
			userid: data.userid,
			openid: data.openid,
			nickname: data.nickname,
			headimage: data.headimgurl,
			sex: data.sex,
			money: money
		})

		//更新红包总金额和个数
		let userObj = await userUtil.getUser(data.userid);
		userObj.totalmoney = Number(userObj.totalmoney) + Number(money);
		userObj.totalnum += 1;
		
		await userUtil.updateUser(userObj);

		res.send({
			isSuccess: true,
			result: _redpacket
		})

	} else {
		res.send({
			isSuccess: false,
			result: result
		})
	}
}

//获取用户红包列表及当前红包总金额等
function getListPacket() {
	this.exec = function(route, req, res) {
		getList(req, res);
	}
}

async function getList(req, res) {
	let data = {};

	let _user = await userUtil.getUser(req.body.userid);

	data.user = _user;

	let _redpackets = await redpacket.findAll({
		where: {
			userid: req.body.userid
		}
	})

	data.redpackets = _redpackets;

	res.send({
		isSuccess: true,
		result: data
	})
}

module.exports = {
	getOnePacket: new getOnePacket(),
	getListPacket: new getListPacket()
}