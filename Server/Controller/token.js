require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendToken = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.Access_Token);
  res.send({ token });
};
module.exports = { sendToken };
