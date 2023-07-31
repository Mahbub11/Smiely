const router= require('express').Router();
const userController= require('../controller/userController');
const { upload}= require('../multer')
const { isAuthenticated } = require("../middleware/auth");


router.get('/userdetails/:username' ,userController.getUserDetails)
router.get('/userdetails-by-id/:userId' ,userController.getUserDetailsById)
router.get('/follow/:userId',isAuthenticated ,userController.followUser)
router.get('/all-user',userController.getAlluser)


module.exports= router;