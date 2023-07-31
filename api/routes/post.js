const router= require('express').Router();
const postController= require('../controller/postController');
const { upload}= require('../multer')
const { isAuthenticated } = require("../middleware/auth");


router.post('/createpost',upload.single("post"),isAuthenticated,postController.createPost)
router.get('/allpost',postController.getAllPost)
router.get('/get-user-following-post',isAuthenticated, postController.getPostsOfFollowing);
router.get('/:postId',isAuthenticated,postController.saveUnsavePost)
router.get('/detail/:postId',isAuthenticated,postController.getPostDetails)
router.get('/like/:postId',isAuthenticated,postController.likeUnlikePost)
router.post('/comment/:postId',isAuthenticated,postController.newComment)

module.exports= router;