const userRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const UserModel = require("../models/user.model");
// /user/<username>
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
// if login reqiured we use auth middleware.
userRouter.post("/update", authMiddleware, (req, res) => {
  res.json({ message: "will update" });
});

module.exports = userRouter;
