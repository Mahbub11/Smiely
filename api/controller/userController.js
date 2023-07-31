const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
// const sendMail = require("../utils/sendMail");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");




exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
  .populate('followers following').populate({
    path:'posts',
    populate:{
        path:'postedBy'
    }
  })

  res.status(200).json({
      success: true,
      user,
  });
  })
  exports.getUserDetailsById = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.userId })
    .populate('followers following').populate({
      path:'posts',
      populate:{
          path:'postedBy'
      }
    })
   
  
    res.status(200).json({
        success: true,
        user,
    });
    })
  // Follow | Unfollow User
exports.followUser = catchAsyncError(async (req, res, next) => {

  const userToFollow=await User.findById(req.params.userId);
  const loggedInUser=await User.findById(req.user._id);

  if(!userToFollow){
    return next(new ErrorHandler('User not Found',404));
  }
  if(loggedInUser.following.includes(userToFollow._id)){
    const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
        const followerIndex = userToFollow.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(followerIndex, 1);

        await loggedInUser.save();
        await userToFollow.save();

        return res.status(200).json({
            success: true,
            message: "User Unfollowed",
            user:userToFollow
        });
  }else{
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);
    await loggedInUser.save();
    await userToFollow.save();

    res.status(200).json({
        success: true,
        message: "User Followed",
        user:userToFollow,
    });
  }
})

exports.getAlluser = catchAsyncError(async (req, res, next) => {


  try {
    const users=await User.find()
    
    res.status(200).json({
      success: true,
      users
  });
    
    
  } catch (error) {
    res.status(500).json({
      success: false,
    
  });
   console.log(error)
  }
})