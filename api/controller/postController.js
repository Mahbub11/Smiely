const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
// const sendMail = require("../utils/sendMail");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const postModel = require("../model/postModel");

exports.createPost = catchAsyncError(async (req, res, next) => {

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const postData = {
        caption: req.body.caption,
        image: fileUrl,
        postedBy: req.user._id
    }

    const post = await postModel.create(postData);

    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
        success: true,
        post,
    });
})

exports.getAllPost = catchAsyncError(async (req, res, next) => {

    const posts = await postModel.find();

    return res.status(200).json({
        posts
    });

})
// Posts of Following
exports.getPostsOfFollowing = catchAsyncError(async (req, res, next) => {

    const user= await User.findById(req.user._id);
    const currentPage= Number(req.query.page) || 1;
    const skipPosts= 4 * (currentPage-1);

    const totalPosts= await postModel.find({
        postedBy:{
            $in: user.following
        }
    }).countDocuments();

    const posts = await postModel.find({
        postedBy: {
            $in: user.following  // ids of whose are following
        }
    }).populate("postedBy").populate({
        path: 'comments',
        populate: {  
            path: 'user'
        }
    }).sort({ createdAt: -1 }).limit(4).skip(skipPosts)


    return res.status(200).json({
        success: true,
        posts: posts,
        totalPosts
    });
})
// Save or Unsave Post
exports.saveUnsavePost = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const post = await postModel.findById(req.params.postId);

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (user.saved.includes(post._id.toString())) {
        user.saved = user.saved.filter((p) => p.toString() !== post._id.toString())
        post.savedBy = post.savedBy.filter((p) => p.toString() !== req.user._id.toString())
        await user.save();
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Unsaved"
        });
    } else {
        user.saved.push(post._id)
        post.savedBy.push(req.user._id)

        await user.save();
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Saved"
        });
    }
});

// Get Post Details
exports.getPostDetails = catchAsyncError(async (req, res, next) => {

    const post = await postModel.findById(req.params.postId)

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    res.status(200).json({
        success: true,
        post,
    });
});

// Like or Unlike Post
exports.likeUnlikePost = catchAsyncError(async (req, res, next) => {

    const post = await postModel.findById(req.params.postId).populate("postedBy")

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);

        post.likes.splice(index, 1);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Unliked",
            post
        });
    } else {
        post.likes.push(req.user._id)

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Liked",
            post
        });
    }
});
exports.newComment = catchAsyncError(async (req, res, next) => {

    const post = await postModel.findById(req.params.postId).populate('savedBy');

    if (!post) {
        return next(new ErrorHandler("Post Not Found", 404));
    }

    if (post.comments.includes(req.user._id)) {
        return next(new ErrorHandler("Already Commented", 500));
    }

    post.comments.push({
        user: req.user._id,
        comment: req.body.comment
    });

    await post.save();

    return res.status(200).json({
        success: true,
        message: "Comment Added",
        post
    });
});