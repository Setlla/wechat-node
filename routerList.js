var router = require('./router');

router.addRoute('/getTicket', require('./routers/wechat').getTicket);
router.addRoute('/getUserInfo', require('./routers/wechat').getUserInfo);

module.exports=router;