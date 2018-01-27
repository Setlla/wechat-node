const user = require('../model.js').user;

//录入初始化数据
function addUserInfo() {
	this.exec = function(route, req, res) {
		add(req, res);
	}
}

function add(req, res) {
	let data = req.body;
	user.findOrCreate({
		where: {
			openid: data.openid,
		},
		defaults: {
			openid: data.openid,
			name: encodeURIComponent(data.name),
			headimage: data.headimgurl
		}
	}).then(function(result) {
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

module.exports = {
	addUserInfo: new addUserInfo()
}