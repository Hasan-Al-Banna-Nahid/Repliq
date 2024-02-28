const { client } = require("../Middleware/mongo.client");

const cartCollection = client.db("Carts").collection("cart");
module.exports = { cartCollection };
