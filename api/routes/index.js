const router = require("express").Router();
const authRoute= require('./auth')
const userRoute= require('./user')
const postRoute= require('./post')
const messageRoute= require('./message')

router.use('/api/v1/auth',authRoute);
router.use('/api/v1/user',userRoute);
router.use('/api/v1/post',postRoute);
router.use('/api/v1/post',postRoute);
router.use('/api/v1/message',messageRoute);


module.exports= router