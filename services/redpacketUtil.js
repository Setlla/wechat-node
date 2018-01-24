const user = require('../model.js').user;
const redpacket = require('../model.js').redpacket;


//有抢的权限则返回true
async function isAuth(userid, openid) {
	let _check = [];
	let _content = ['你没有抢红包的权限','你已经抢过红包啦','红包抢完啦'];

	_check.push(await checkUser(openid));
	_check.push(await checkAuth(userid, openid));
	_check.push(await checkNum(userid));
	
	let result = null;
	if (_check.indexOf(true) >= 0){ result = _content[_check.indexOf(true)]};
	
	return result;
}

//判断用户是否为在校学生 ，是返回true
async function checkUser(openid) {
	let _user = await user.findAll({
		where: {
			openid: openid
		}
	});
	let result = _user[0] ? true : false;
	return result;
}

//判断用户是否已抢红包，已抢返回true
async function checkAuth(userid, openid) {
	let _user = await redpacket.findAll({
		where: {
			userid: userid,
			openid: openid
		}
	});
	
	let result = _user[0] ? true : false;
	return result;
}


//判断红包个数是否已达200个。已达返回true
async function checkNum(userid) {
	let obj = await redpacket.findAndCountAll({
		where: {
			userid: userid
		}
	})
	
	let result = (obj.count >= 200) ? true : false;
	return result;
}


module.exports = {
	isAuth: isAuth
}