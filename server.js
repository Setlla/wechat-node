var restify = require('restify');
var schedule = require('node-schedule');
var wechatUtil = require('./services/wechatUtil.js');

//添加路由表
var router = require("./routerList.js");

function onListened() {
	console.log('Node server starts at 443.');
}

var rule = new schedule.RecurrenceRule();  
var times = [1,3,5,7,9,11,13,15,17,19];
rule.hour = times; 
schedule.scheduleJob(rule, wechatUtil.getTicketTime);

function onConnected(req, res) {
	router.handleRoute(req.url, req, res);
}
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.post('/:name', onConnected);
server.get('/:name', onConnected);
server.listen(443, onListened);