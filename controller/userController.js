const User = require("../models/user");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const Feedback = require("../models/feedback");
const path = require("path");

module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.cp) {
      console.log("Both passwords should be matching");
      const Error = new Error();
      throw Error;
    }
    let allUsers = await User.findOne({ email: req.body.email });
    if (!allUsers) {
      const { name, email, password } = req.body;
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        User.create({
          name,
          email,
          password: hash,
        });
      });

      console.log("User Registered Succ");
      return res.status(200).json({
        message: "User created Successfully",
      });
    } else {
      console.log("User Already registered");
      return res.status(502).json({
        message: "User Already registered",
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(301).json({
        message: "Fields cannot be empty",
      });
    }
    // console.log("Email",email);
    let allUsers = await User.findOne({ email: email });
    // console.log("cu",allUsers);
    if (!allUsers) {
      console.log("Cannot find user");
      return res.status(422).json({
        message: "No user found with this email",
      });
    } else {
      bcrypt.compare(password, allUsers.password, async (err, result) => {
        if (err) {
          return res.status(301).json({
            message: "Error in matching password with bcrypt",
          });
        }
        if (!result) {
          return res.status(301).json({
            message: "Inavlid username or password",
          });
        } else {
          let token = jwt.sign(allUsers.toJSON(), `${process.env.SECRET}`, {
            expiresIn: "10000000",
          });
          res.cookie("jwt", token);
          return res.status(200).json({
            message: "Login successfull",
            data: token,
          });
        }
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(501).json({
      message: "Internal Server Error",
    });
  }
};
//Authenticated Route

module.exports.verifyUser = async (req, res) => {
  // console.log(req.user);
  return res.status(200).json({
    message: "User authorized",
    data: req.user,
  });
};

module.exports.googleHome = async (req, res) => {
  // console.log("Inside google",req.user);
  let token = jwt.sign(req.user.toJSON(), `${process.env.SECRET}`, {
    expiresIn: "10000000",
  });
  res.cookie("jwt", token);
  const FRONTEND_URL='/google-login'
  return  res.redirect(FRONTEND_URL + '?token=' + token);
  // return res.status(200).json({
  //   message:"Login Successfull",
  //   data:token
  // })

};
module.exports.logout = async (req, res) => {
  try {
    // req.logout(async (err,user) => {
    // if (err) {
    //   console.log("Error",err);
    //   return res.status(501).json({
    //     message: "Failed to logout",
    //   });
    // }else{
      // res.clearCookie("jwt");
      // res.clearCookie('jwt');
      // res.cookie('jwt' , '', {expire : new Date() + 100});
      req.logout(function(){
        console.log("Logout Done",req.cookies);
        return res.status(200).json({
          message: "Logout sucess",
        });

      })
    // }
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Saving users Feedback
module.exports.saveFeedback = async (req, res) => {
  try {
    var allFeedback = await Feedback.find();
    let uid = allFeedback.length;
    // console.log(allFeedback.length);
    if (!req.body.email || !req.body.content) {
      return res.status(422).json({
        message: "Plzz Fill The Form to save",
      });
    }
    let feedId = `Feed00${uid + 1}`;
    // console.log(feedId);
    let newFeedback = await Feedback.create({
      feedId: feedId,
      email: req.body.email,
      content: req.body.content,
    });
    if (!newFeedback) {
      console.log("Error");
      const Error = new Error();
      throw Error;
    }
    return res.status(200).json({
      message: "Feedback submitted sucessfully",
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(501).json({
      message: "Internal Server Error",
    });
  }
};
