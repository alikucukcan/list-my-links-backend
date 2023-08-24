const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    //if token not exist return error with http unauthorized status code 401
    res.status(401).json({
      error: "Unauthorized user",
    });
    return;
  }

  try {
    // open the token with jwt.verify to reach user data
    // if token is invalid, jwt.verify function throws an error.
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    // if token is valid, payload includes the user data
    // get the user data with user id from database
    let user = await UserModel.findById(payload._id);
    // if the user not exist
    if (!user) {
      res.status(401).json({
        error: "Unauthorized user",
      });
      return;
    } else {
      // if user exist, we set the user to req.user to reach the user from controller functions.
      // So,  controller functions can reach the user with req.user
      req.user = user;
      next();
    }
  } catch (error) {
    // if the token is invalid, returns errors message with 401 unauthoized status code
    res.status(401).json({
      error: "Unauthorized user",
    });
  }
};

module.exports = authMiddleware;
