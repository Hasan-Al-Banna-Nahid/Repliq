require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const router = require("./Routes/route");
app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cors());
app.use(router);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Repliq Is Running");
});

app.listen(PORT, () => {
  console.log(`Repliq is Running at ${PORT}`);
});
