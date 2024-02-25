const { client } = require("../Middleware/mongo.client");
const emailCollection = client.db("emails").collection("email");
module.exports = { emailCollection };
