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

	if(!data.openid || !data.userid) {
		res.send({
			isSuccess: false,
			result: '网速太慢，没抢到红包哦'
		})
	}
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

	if(!_user) {
		res.send({
			isSuccess: false,
			result: '您没参与这次活动'
		})
	}

	data.user = _user;

	let _redpackets = await redpacket.findAll({
		where: {
			userid: req.body.userid
		},
		order: [
			['updatedAt', 'DESC']
		]
		
	})
	data.redpackets = _redpackets;
	
	getTotal(_redpackets, data.user);
	
	res.send({
		isSuccess: true,
		result: data
	})
}

function getTotal(_redpackets, user) {
	let totalmoney = 0;
	for(var i = 0; i < _redpackets.length; i++) {
		totalmoney += Number(_redpackets[i].dataValues.money)
	}
	user.totalmoney = Number(totalmoney).toFixed(2);
	user.totalnum = _redpackets.length;
}

module.exports = {
	getOnePacket: new getOnePacket(),
	getListPacket: new getListPacket()
}