const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
// const sendMail = require("../utils/sendMail");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

exports.register = catchAsyncError(async (req, res, next) => {
  try {

    console.log(req.body)
    const { name, email, password,username } = req.body;
     
  
    const userEmail = await User.findOne({ email });


    const filename = req.file.filename;
    const fileUrl = path.join(filename);


    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `api/uploads/${filename}`;
      // console.log(filePath)
      fs.unlink( `${filePath}`, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting file" });
        }
      });

 
      return next(new ErrorHandler("User already exists", 400));
    } else {

      const userData= await User.create({
      name: name,
      username: username,
      email: email,
      password: password,
      avatar: fileUrl,
      verified:false
      });
      await userData.save();
        res.status(201).json({
        success: true,
        message: `Signup Success!`,
        user:userData
      });
    }

    // const activationToken = createJwtToken(user);

    // const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // try {
    //   await sendMail({
    //     email: user.email,
    //     subject: "Activate your account",
    //     message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    //   });
    //   res.status(201).json({
    //     success: true,
    //     message: `please check your email:- ${user.email} to activate your account!`,
    //   });
    // } catch (error) {
    //   return next(new ErrorHandler(error.message, 500));
    // }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// exports.activation = catchAsyncError(async (req, res, next) => {
//   try {
//     const { activation_token } = req.body;

//     const tokenUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

//     if (!tokenUser) {
//       return next(new ErrorHandler("Invalid token", 400));
//     }
//     const { name, email, password, avatar } = tokenUser;
  
//     let user = await User.findOne({ email });

//     if (user && user.verified=== false) {

//       user.verified= true;
//       await user.save();
//     }
  
//     // send the token to browser cookie
//     sendToken(user, 201, res);
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// create activation token
const createJwtToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

exports.login = catchAsyncError(async (req, res, next) => {

  try {
   
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
   

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

exports.getUser = catchAsyncError(async (req, res, next) => {

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
      message: "User Found",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
