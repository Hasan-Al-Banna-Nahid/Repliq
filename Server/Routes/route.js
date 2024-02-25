const express = require("express");
const { sendToken } = require("../Controller/token");
const nodemailer = require("nodemailer");
const { verifyJwt } = require("../Middleware/Jwt.middleware");
const {
  user,
  admin,
  makeDefaultUser,
  makeAdmin,
} = require("../Controller/user.collection");
const {
  getProducts,
  addProduct,
} = require("../Controller/products.controller");
const {
  getOrder,
  createOrder,
  deleteOrder,
} = require("../Controller/order.controller");
const {
  getCart,
  addToCart,
  deleteCartItem,
} = require("../Controller/cart.controller");

const router = express.Router();
router.post("/jwt", sendToken);
router.get("/users", user);
router.get("/users/admin/:email", verifyJwt, admin);
router.post("/users", makeDefaultUser);
router.patch("/users/admin/:id", makeAdmin);
router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/orders", getOrder);
router.post("/orders/:id", createOrder);
router.delete("/orders/:id", deleteOrder);
router.get("/carts", getCart);
router.post("/carts", addToCart);
router.delete("/carts/:id", deleteCartItem);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "iamnahid591998@gmail.com",
    pass: "xfuh poeu kiai xiky",
  },
});

router.post("/sendConfirmEmail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const data = req.body;

    const info = await transporter.sendMail({
      from: '"Repliq" iamnahid591998@gmail.com',
      to: `${data.email}`,
      subject: "Order Confirmation",
      text: "Your Order Has Been Confirmed",
      html: `<b>${data.product} has been Confirmed For ${data.user}</b>`,
    });

    const result = await emailCollection.insertOne(query, data);
    res.json(result);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    res.status(500).json({
      error: "An error occurred while sending the confirmation email.",
    });
  }
});

module.exports = router;
