const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const postModel = require("../model/postModel");
const  chatModel = require("../model/chatModel");


exports.newChat = catchAsyncError(async (req, res, next) => {

    const chatExists = await chatModel.findOne({
        users: {
            $all: [req.user._id, req.body.receiverId]
        }
    });

    if (chatExists) {
        return res.status(200).json({
            success: true,
            newChat: chatExists
        });
    }

    const newChat = await chatModel.create({
        users: [req.user._id, req.body.receiverId],
    });

    res.status(200).json({
        success: true,
        newChat
    });

})




exports.getUserChatList = catchAsyncError(async (req, res, next) => {

    const chatUser = await chatModel.find({
        users: {
            $in: [req.user._id]
        }
    })
    .populate({
        path:'users'
    });

    res.status(200).json({
        success: true,
        chatUser
    });


})

exports.newMessage = catchAsyncError(async (req, res, next) => {

    const {chatId,content}= req.body;
    const msgData={
        sender:req.user._id,
        chatId,
        content
    }
})