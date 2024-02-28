const express = require("express");
const { sendToken } = require("../Controller/token");
const nodemailer = require("nodemailer");
const { verifyJwt } = require("../Middleware/Jwt.middleware");
const {
  user,
  admin,
  makeDefaultUser,
  makeAdmin,
  PostUser,
  existingUser,
  findUser,
} = require("../Controller/user.controller");
const {
  getProducts,
  addProduct,
} = require("../Controller/products.controller");
const {
  getOrder,
  createOrder,
  deleteOrder,
  getOrderByUser,
} = require("../Controller/order.controller");
const {
  getCart,
  addToCart,
  deleteCartItem,
  getUserCart,
} = require("../Controller/cart.controller");
const { Admin } = require("mongodb");
const { sendEmail } = require("../Controller/email.controller");

const router = express.Router();
router.post("/jwt", sendToken);
router.get("/users", user);
router.get("/users/admin/:email", verifyJwt, admin);
router.post("/users", makeDefaultUser);
router.post("/makeUser", findUser);
router.patch("/users/admin/:id", makeAdmin);
router.get("/admin/:id", admin);
router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/orders", getOrder);
router.get("/order", getOrderByUser);
router.post("/orders/:id", createOrder);
router.delete("/orders/:id", deleteOrder);
router.get("/carts", getCart);
router.get("/cart", getUserCart);
router.post("/carts", addToCart);
router.delete("/carts/:id", deleteCartItem);
router.post("/sendConfirmEmail/:id", sendEmail);

module.exports = router;
