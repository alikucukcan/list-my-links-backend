const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authRouter = require("express").Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({
      error: "username and password required",
    });
    return;
  }
  try {
    let user = await UserModel.findOne({
      username: username,
      password: password,
    });
    console.log("user", user);
    if (!user) {
      res.status(401).json({
        error: "wrong username or password",
      });
      return;
    } else {
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
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

module.exports = authRouter;
