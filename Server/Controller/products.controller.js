const { ProductsCollections } = require("../Model/products.collection");

const getProducts = async (req, res) => {
  const result = await ProductsCollections.find().toArray();
  res.send(result);
};
const addProduct = async (req, res) => {
  const data = req.body;
  const result = await ProductsCollections.insertOne(data);
  res.send(result);
};

module.exports = {
  getProducts,
  addProduct,
};
