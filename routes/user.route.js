const userRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const UserModel = require("../models/user.model");
const sendMail = require("../services/mail.service");

// /user/<username> -> get user profile
userRouter.get("/:username", async (req, res) => {
  // which user wants to get from database ,
  // username reads from url, username is a parameter. we declared on url as /:username,
  // there for we can reach the username data from req.params.username
  let username = req.params.username;
  try {
    // get the user by username from database
    let user = await UserModel.findOne({
      username: username,
    });
    // if user not exist
    if (!user) {
      res.status(404).json({
        error: "User Not Found",
      });
    } else {
      // if user exist
      res.json(user);
    }
  } catch (error) {
    // if there is an error returns an error
    res.status(500).json({
      error: "Server error",
    });
  }
});

// /user/me  -> delete user account
userRouter.delete("/me", authMiddleware, async (req, res) => {
  let user = req.user;
  try {
    await UserModel.findOneAndDelete({
      username: user.username,
    });
    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "User not deleted",
    });
  }
});

// if login reqiured we use auth middleware.
userRouter.post("/update", authMiddleware, async (req, res) => {
  // updated data from request body sent from frontend
  const newUserData = req.body;
  // current user (who send request) provided from authMiddleware
  const user = req.user;
  try {
    // update the current user with newUserData (sent from client)
    await UserModel.updateOne(
      {
        username: user.username,
      },
      newUserData
    );
    // if succes
    res.json({
      message: "user updated",
    });
  } catch (error) {
    // if failed
    res.status(500).json({
      error: "user not updated",
    });
  }
});

userRouter.post(
  "/upload",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    console.log(req.file);
    await UserModel.updateOne(
      { username: req.user.username },
      {
        profilePicture: req.file.filename,
      }
    );
    res.json({ message: "image uploaded" });
  }
);

module.exports = userRouter;
