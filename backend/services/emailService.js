const { transporter } = require("../config/email");
const {
  bookingConfirmationTemplate,
  bookingUpdatedTemplate,
  bookingCancelledTemplate,
} = require("../utils/emailTemplates");

async function sendBookingConfirmationEmail(booking) {
  if (!booking.email) return;

  const template = bookingConfirmationTemplate(booking);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: template.subject,
    html: template.html,
  });
}

async function sendBookingUpdatedEmail(booking) {
  if (!booking.email) return;

  const template = bookingUpdatedTemplate(booking);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: template.subject,
    html: template.html,
  });
}

async function sendBookingCancelledEmail(booking) {
  if (!booking.email) return;

  const template = bookingCancelledTemplate(booking);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: template.subject,
    html: template.html,
  });
}

async function sendAdminBookingAlert(booking) {
  if (!process.env.ADMIN_EMAIL) return;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${booking.customerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${booking.customerName}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Email:</strong> ${booking.email || "N/A"}</p>
        <p><strong>Service:</strong> ${booking.serviceName}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Source:</strong> ${booking.source}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
      </div>
    `,
  });
}

module.exports = {
  sendBookingConfirmationEmail,
  sendBookingUpdatedEmail,
  sendBookingCancelledEmail,
  sendAdminBookingAlert,
};


