const router= require('express').Router();
const messageController= require('../controller/messageController');
const { upload}= require('../multer')
const { isAuthenticated } = require("../middleware/auth");

router.post('/newChat',isAuthenticated,messageController.newChat)
router.get('/chatList',isAuthenticated,messageController.getUserChatList)

module.exports= router;