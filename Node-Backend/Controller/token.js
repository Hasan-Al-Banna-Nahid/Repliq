require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendToken = (req, res) => {
  const email = req.body;
  console.log(email);
  const token = jwt.sign(email, process.env.Access_Token);
  res.send({ token });
};
module.exports = { sendToken };
