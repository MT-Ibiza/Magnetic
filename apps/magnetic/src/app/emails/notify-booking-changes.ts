import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from './partials';

export function bookingStatusTemplate(params: {
  username: string;
  bookingId: number;
  bookingDate: string;
  status: string;
}) {
  const { status, username, bookingId, bookingDate } = params;
  const year = getCurrentYear();

  const statusMessage =
    status === 'cancelled'
      ? `Your booking #${bookingId} has been successfully cancelled.`
      : `Your booking #${bookingId} has been updated.`;

  const statusColor = status === 'cancelled' ? '#e53935' : '#4caf50';

  const content = `
  <div class="content">
    <h2>Hi, ${username}</h2>
    <p>${statusMessage}</p>
    <p>
     You can view the details visiting your booking page:
    </p>
    <a
      class="link-btn"
      href="https://bookings.magnetic-travel.com/bookings"
      target="_blank"
      >My Bookings</a
    >
    <p>If you have any questions or need further assistance, feel free to contact us.</p>
    ${signatureTemplate}
  </div>
`;

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modify Request Received!</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
      rel="stylesheet"
    />
    ${stylesEmails}
  </head>
  <body>
    <div class="email-container">
      ${headerTemplate}
      ${content}
      ${footerTemplate(year)}
    </div>
  </body>
</html>
  `;
}
