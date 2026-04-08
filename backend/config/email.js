const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function verifyEmailTransport() {
  try {
    await transporter.verify();
    console.log("Email transporter is ready");
  } catch (error) {
    console.error("Email transporter error:", error.message);
  }
}

module.exports = {
  transporter,
  verifyEmailTransport,
};
