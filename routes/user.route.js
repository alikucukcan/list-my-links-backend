const userRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const UserModel = require("../models/user.model");

// /user/<username> -> get user profile
userRouter.get("/:username", async (req, res) => {
  let username = req.params.username;
  try {
    let user = await UserModel.findOne({
      username: username,
    });
    console.log("user", user);
    if (!user) {
      res.status(404).json({
        error: "User Not Found",
      });
    } else {
      res.json(user);
    }
  } catch (error) {
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
  const newUserData = req.body;
  const user = req.user;
  try {
    await UserModel.updateOne(
      {
        username: user.username,
      },
      newUserData
    );

    res.json({
      message: "user updated",
    });
  } catch (error) {
    res.status(500).json({
      error: "user not updated",
    });
  }
});

module.exports = userRouter;
