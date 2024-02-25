const { client } = require("../Middleware/mongo.client");

const usersCollections = client.db("Users").collection("User");
module.exports = { usersCollections };
