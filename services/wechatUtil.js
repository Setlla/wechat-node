const axios = require('axios');
const cache = require("../cache.js");
const sign = require('./sign.js');

const appid = 'wx73da5380e9bc39de';
const secret = 'f729b19cf1b2f9372315f3c14254db8b';

//获取access_token值，并缓存
async function getToken() {
	var result = await axios({
		method: 'get',
		url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
	})
	return result.data.access_token
//	cache.put('token', result.data.access_token);
}

//
async function getTicket(url) {
	var access_token = await getToken();
//	let token = cache.get('token');
	
	var result = await axios({
		method: 'get',
		url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`,
	})
	
	return sign(result.data.ticket, url);
}


//获取access_token  openid 
async function getAccessToken(code) {
	var result = await axios({
		method: 'get',
		url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`,
	})
	return result.data;
}

//获取微信用户基本信息
async function getUserInfo(code) {
	
	var data = await getAccessToken(code);
	
	var result = await axios({
		method: 'get',
		url: `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}&lang=zh_CN`,
	})

	return result;
}




module.exports = {
	getUserInfo: getUserInfo,
	getTicket: getTicket
}