require("dotenv")
const Users = require("../Models/userModel");

const jwt = require("jsonwebtoken");
key = process.env.SECRET_KEY

const admin_token_check = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      res.send({
        success: false,
        message: "Token is not provided",
      });
    } else {
      const token = req.header("Authorization").split(" ")[1];
      const decoded = jwt.verify(token, key);
      req.data = decoded;
      if (decoded.role === "Admin") {
        Users.findById(decoded.id, (err, user) => {
          if (err) {
            res.json({
              success: false,
              message: "Tokem expired",
              error: err
            });
          } else {
            if (token == user.token) {
              next();
            } else {
              res.json({
                success: false,
                message: "Invalid token",
              });
            }
          }
        });
      } else {
        res.json({
          success: false,
          message: "You are not authorised to perform this function",
        });
      }
    }
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

module.exports = admin_token_check;
