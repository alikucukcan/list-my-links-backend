const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const sendMail = require("../services/mail.service");

const authRouter = require("express").Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    //validate username & password exist
    res.status(401).json({
      //401 unauthorized status code
      error: "username and password required",
    });
    return;
  }
  try {
    //get user with username & password
    let user = await UserModel.findOne({
      username: username,
      password: password,
    });
    console.log("user", user);
    //if user not exist
    if (!user) {
      res.status(401).json({
        error: "wrong username or password",
      });
      return;
    } else {
      //generate token with SECRET KEY, includes user record. 1 hour expire
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      //send token response with 200 http status code (ok)
      res.status(200).json({ token: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
      detail: error,
    });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    let user = await UserModel.create(req.body);
    console.log("user", user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      detail: error,
    });
  }
});

const generateCode = () => {
  let code = "";

  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 10);
    code = code + random;
  }

  return code;
};

authRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const code = generateCode();
  try {
    await UserModel.updateOne(
      { email },
      {
        resetPasswordCode: code,
      }
    );

    await sendMail(
      email,
      "Reset password",
      "Your reset password code is :" + code
    );

    res.json({ message: "email sent" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "email not sent",
    });
  }
});

authRouter.post("/reset-password", async (req, res) => {
  const { email, code, password } = req.body;
  try {
    let user = await UserModel.findOne({ email, resetPasswordCode: code });
    if (!user) {
      res.status(500).json({
        error: "password not changed",
      });
    } else {
      user.password = password;
      await user.save();
      res.json({ message: "password changed" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "password not changed",
    });
  }
});

module.exports = authRouter;
