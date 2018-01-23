var router = require('./router');

router.addRoute('/getTicket', require('./routers/wechat').getTicket);
router.addRoute('/getUserInfo', require('./routers/wechat').getUserInfo);

router.addRoute('/getOnePacket', require('./routers/redpacket').getOnePacket);
router.addRoute('/getListPacket', require('./routers/redpacket').getListPacket);

router.addRoute('/addUserInfo', require('./routers/user').addUserInfo);

module.exports=router;