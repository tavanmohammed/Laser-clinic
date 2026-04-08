const LOGO_URL = "data:image/png;base64,frontend/src/assets/Logo.png"; // replace with your actual logo URL
const PHONE = "647-809-8545";
const CLINIC_NAME = "Alla Beauty Laser & Skin Clinic";
const ACCENT = "#f2a482";

function baseTemplate({ title, preheader, bodyHtml }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:Georgia,serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="background:#ffffff;padding:32px 40px 24px;border-radius:16px 16px 0 0;border-bottom:1px solid #ede9e3;">
              <img src="${LOGO_URL}" alt="${CLINIC_NAME}" height="48" style="display:block;height:48px;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Contact strip -->
          <tr>
            <td style="background:#faf9f7;padding:20px 40px;border-top:1px solid #ede9e3;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#8a8a82;">
                Need to make changes or cancel?
              </p>
              <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#3a3a38;">
                Call or text us: <a href="tel:+16478098545" style="color:${ACCENT};text-decoration:none;">${PHONE}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#aaaaaa;">
                ${CLINIC_NAME}<br/>
                This email was sent because you booked an appointment with us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

function detailsTable(booking) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#faf9f7;border:1px solid #ede9e3;border-radius:10px;margin:24px 0;font-family:Arial,sans-serif;font-size:14px;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#8a8a82;width:40%;">Service</td>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#3a3a38;font-weight:bold;">${booking.serviceName}</td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#8a8a82;">Date</td>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#3a3a38;font-weight:bold;">${booking.date}</td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#8a8a82;">Time</td>
        <td style="padding:14px 20px;border-bottom:1px solid #ede9e3;color:#3a3a38;font-weight:bold;">${booking.time}</td>
      </tr>
      <tr>
        <td style="padding:14px 20px;color:#8a8a82;">Status</td>
        <td style="padding:14px 20px;color:#3a3a38;font-weight:bold;text-transform:capitalize;">${booking.status}</td>
      </tr>
    </table>
  `;
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function bookingConfirmationTemplate(booking) {
  const bodyHtml = `
    <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;color:#3a3a38;font-weight:normal;">
      Your booking is confirmed ✓
    </h2>
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:15px;color:#5a5a56;">
      Hello <strong>${booking.customerName}</strong>, we're looking forward to seeing you!
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#8a8a82;">
      Here's a summary of your appointment:
    </p>
    ${detailsTable(booking)}
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#5a5a56;line-height:1.7;margin:0;">
      If you need to make any changes or cancel your appointment, please contact us at least
      <strong>24 hours in advance</strong> by calling or texting
      <a href="tel:+16478098545" style="color:${ACCENT};text-decoration:none;">${PHONE}</a>.
    </p>
  `;

  return {
    subject: `Booking Confirmed — ${booking.serviceName} on ${booking.date}`,
    html: baseTemplate({ title: "Booking Confirmed", preheader: `Your ${booking.serviceName} appointment is confirmed.`, bodyHtml }),
  };
}

// ── Updated ───────────────────────────────────────────────────────────────────
function bookingUpdatedTemplate(booking) {
  const bodyHtml = `
    <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;color:#3a3a38;font-weight:normal;">
      Your booking has been updated
    </h2>
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:15px;color:#5a5a56;">
      Hello <strong>${booking.customerName}</strong>, your appointment details have changed.
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#8a8a82;">
      Here are your updated appointment details:
    </p>
    ${detailsTable(booking)}
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#5a5a56;line-height:1.7;margin:0;">
      If you have any questions or need further changes, please call or text us at
      <a href="tel:+16478098545" style="color:${ACCENT};text-decoration:none;">${PHONE}</a>.
    </p>
  `;

  return {
    subject: `Booking Updated — ${booking.serviceName} on ${booking.date}`,
    html: baseTemplate({ title: "Booking Updated", preheader: `Your appointment has been updated.`, bodyHtml }),
  };
}

// ── Cancelled ─────────────────────────────────────────────────────────────────
function bookingCancelledTemplate(booking) {
  const bodyHtml = `
    <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;color:#3a3a38;font-weight:normal;">
      Your booking has been cancelled
    </h2>
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:15px;color:#5a5a56;">
      Hello <strong>${booking.customerName}</strong>, your appointment has been cancelled.
    </p>
    ${detailsTable(booking)}
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#5a5a56;line-height:1.7;margin:0;">
      We'd love to see you again! To book a new appointment, call or text us at
      <a href="tel:+16478098545" style="color:${ACCENT};text-decoration:none;">${PHONE}</a>.
    </p>
  `;

  return {
    subject: `Booking Cancelled — ${booking.serviceName}`,
    html: baseTemplate({ title: "Booking Cancelled", preheader: `Your appointment has been cancelled.`, bodyHtml }),
  };
}

module.exports = {
  bookingConfirmationTemplate,
  bookingUpdatedTemplate,
  bookingCancelledTemplate,
};