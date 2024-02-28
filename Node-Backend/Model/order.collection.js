const { client } = require("../Middleware/mongo.client");

const ordersCollection = client.db("orders").collection("order");

module.exports = { ordersCollection };
