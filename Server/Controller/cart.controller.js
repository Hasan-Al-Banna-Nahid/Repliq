const { ObjectId } = require("mongodb");
const { cartCollection } = require("../Model/cart.collection");

const getCart = async (req, res) => {
  const result = await cartCollection.find().toArray();
  res.send(result);
};
const addToCart = async (req, res) => {
  const data = req.body;
  const result = await cartCollection.insertOne(data);
  res.send(result);
};
const deleteCartItem = async (req, res) => {
  const id = req.params.id;

  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  res.send(result);
};
module.exports = { deleteCartItem, addToCart, getCart };
