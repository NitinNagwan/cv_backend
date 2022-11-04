const jwt = require("jsonwebtoken");
const key = "x-access-token";
const config = process.env;
const verifyToken = (req, res, next) => {
  console.log(req.header);
  const bearer = req.header("Authorization");
  const token = bearer.split(" ")[1];
  console.log(bearer, "gdafda");
  console.log(token, "token");
  try {
    if (!token) {
      res.status(403).json({
        success: false,
        message: "A token is required for authentication",
      });
    } else {
      const decoded = jwt.verify(token, key);
      req.user = decoded;
      console.log(decoded);
      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something wentt wrong",
      error: err,
    });
  }
};
module.exports = verifyToken;
