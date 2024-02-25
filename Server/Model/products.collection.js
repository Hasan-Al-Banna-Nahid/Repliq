const { client } = require("../Middleware/mongo.client");
const ProductsCollections = client.db("products").collection("product");
module.exports = { ProductsCollections };
