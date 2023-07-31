const router= require('express').Router();
const authController= require('../controller/authController');
const { upload}= require('../multer')
const { isAuthenticated } = require("../middleware/auth");


router.post('/create-user',upload.single("avatar"),authController.register);
// router.post('/activation',authController.activation);
router.post('/login',authController.login)
// router.get('/getuser',isAuthenticated ,authController.getUser)



module.exports= router;