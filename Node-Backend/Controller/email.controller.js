const { ObjectId } = require("mongodb");
const { emailCollection } = require("../Model/email.collection");
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
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

    const result = await emailCollection.insertOne(data);
    res.json(result);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    res.status(500).json({
      error: "An error occurred while sending the confirmation email.",
    });
  }
};
module.exports = { sendEmail };
