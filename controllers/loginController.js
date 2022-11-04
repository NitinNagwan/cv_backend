const Users = require("../Models/userModels");
const key = "x-access-token";
const jwt = require("jsonwebtoken");

async function login (req, res) {
  const data = req.body;
  console.log(data);
  const findData = await Users.findOne(data);
  console.log(findData);
  if (findData) {
    const token = jwt.sign({ email: findData.email }, key, {
      expiresIn: "20m",
    });
     findData.token = token;
  
    res.send({ loggedInUser: findData, token: token });
   } else {
      res.json("wrong password");                
}
}

module.exports = login;
