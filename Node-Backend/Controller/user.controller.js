const { ObjectId } = require("mongodb");
const { usersCollections } = require("../Model/user.collection");

const user = async (req, res) => {
  const result = await usersCollections.find().toArray();
  res.send(result);
};
const PostUser = async (req, res) => {
  const data = req.body;
  const result = await usersCollections.insertOne(data);
  res.send(result);
};
const admin = async (req, res) => {
  const email = req.params;
  // if (req.decoded.email !== email) {
  //   res.send({ isAdmin: false });
  // }
  const query = { email: email.id };
  const user = await usersCollections.findOne(query);
  const result = { admin: user?.role === "admin" };

  res.send(result);
};
const findUser = async (req, res) => {
  const data = req.body;
  const query = { email: data?.email };
  const existingUser = await usersCollections.findOne(query);
  if (existingUser) {
    return res.send({ message: "User Already Exist" });
  }
  console.log(existingUser);
  const result = await usersCollections.insertOne(data);
  res.send(result);
};
const defaultUser = async (req, res) => {
  const email = req.params.email;
  if (req.decoded.email !== email) {
    res.send({ isAdmin: false });
  }
  const query = { email: email };
  const user = await usersCollections.findOne(query);
  // console.log(user);
  const result = { user: user?.role === "user" };

  res.send(result);
};
// const existingUser = async (req, res) => {
//   const data = req.body;
//   console.log(data);
//   // const query = { email: user?.email };
//   // const existingUser = await usersCollections.findOne(query);
//   // if (existingUser) {
//   //   res.send({ message: "User Already Exist" });
//   // }
//   // const result = await usersCollections.insertOne({ email, name });
//   // res.send(result);
// };
const makeAdmin = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: `admin`,
    },
  };
  const result = await usersCollections.updateOne(query, updateDoc);
  res.send(result);
};
const makeDefaultUser = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      role: "user",
    },
  };

  const result = await usersCollections.updateOne(query, updatedDoc);
  res.send(result);
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollections.deleteOne(query);
  res.send(result);
};
module.exports = {
  user,
  admin,
  defaultUser,

  makeAdmin,
  makeDefaultUser,
  deleteUser,
  findUser,
  PostUser,
};
