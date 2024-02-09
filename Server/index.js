require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Repliq Is Running");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://iamnahid591998:mWcWAEp20OqL6bZD@cluster0.4yisgtc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  ` `;
  if (!authorization) {
    res.status(401).send({ error: true, message: "Unauthorized Access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.Access_Token, function (err, decoded) {
    if (err) {
      res.status(403).send({ error: true, message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const UsersCollections = client.db("Users").collection("User");
    const ProductsCollections = client.db("products").collection("product");

    const cartCollection = client.db("Carts").collection("cart");
    const ordersCollection = client.db("orders").collection("order");
    const emailCollection = client.db("emails").collection("email");

    app.get("/users", async (req, res) => {
      const result = await UsersCollections.find().toArray();
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const result = await ProductsCollections.find().toArray();
      res.send(result);
    });
    app.get("/carts", async (req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    });
    app.get("/orders", async (req, res) => {
      const result = await ordersCollection.find().toArray();
      res.send(result);
    });
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ isAdmin: false });
      }
      const query = { email: email };
      const user = await UsersCollections.findOne(query);
      const result = { admin: user?.role === "admin" };

      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await UsersCollections.findOne(query);
      if (existingUser) {
        return res.send({ message: "User Already Exist" });
      }
      // console.log(existingUser);
      const result = await UsersCollections.insertOne(user);
      res.send(result);
    });
    app.post("/jwt", (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.Access_Token);
      res.send({ token });
    });
    app.post("/products", async (req, res) => {
      const data = req.body;
      const result = await ProductsCollections.insertOne(data);
      res.send(result);
    });
    app.post("/carts", async (req, res) => {
      const data = req.body;
      const result = await cartCollection.insertOne(data);
      res.send(result);
    });
    app.post("/orders/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const data = req.body;

        // Ensure the _id is unique
        const newOrder = {
          _id: new ObjectId(),
          ...data,
          userId: new ObjectId(id),
        };

        const result = await ordersCollection.insertOne(newOrder);
        res.json(result);
      } catch (error) {
        console.error("Error creating order:", error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the order." });
      }
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: `admin`,
        },
      };
      const result = await UsersCollections.updateOne(query, updateDoc);
      res.send(result);
    });
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.send(result);
    });

    const nodemailer = require("nodemailer");

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

    async function main() {
      app.post("/sendConfirmEmail/:id", async (req, res) => {
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
    }

    main().catch(console.error);

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Repliq is Running at ${PORT}`);
});
