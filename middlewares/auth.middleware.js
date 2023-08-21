const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      error: "Unauthorized user",
    });
    return;
  }

  try {
    let payload = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(payload._id);
    if (!user) {
      res.status(401).json({
        error: "Unauthorized user",
      });
      return;
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized user",
    });
  }
};

module.exports = authMiddleware;
