const user = require('../model.js').user;

async function getUser(userid) {
	let _user = await user.findAll({
		where: {
			id: userid
		}
	})
	
	if(!_user.length) {return null}
	return _user[0].dataValues;
}

async function updateUser(userObj) {	
	let _user = await user.update(userObj, {
		where: {
			id: userObj.id
		}
	})
	
	return _user[0];
}

module.exports = {
	getUser: getUser,
	updateUser: updateUser
}