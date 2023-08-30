const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "listmylinkss@gmail.com",
    pass: process.env.GMAIL_APP_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, title, content) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"List my links support" <listmylinkss@gmail.com>', // sender address
    to: to, // list of receivers
    subject: title, // Subject line
    text: content, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;
