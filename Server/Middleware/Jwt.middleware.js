require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized user" });
  }
  const token = authorization.split(".")[1];
  console.log(token);

  jwt.verify(token, process.env.Access_Token, function (err, decoded) {
    if (err) {
      return res.status(403).send({ error: true, message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
};
module.exports = { verifyJwt };
