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
  itemName: string;
}) {
  const { username, bookingId, itemName } = params;
  const year = getCurrentYear();

  const content = `
  <div class="content">
    <h2>Hi, ${username}</h2>
    <p>Your booking #${bookingId} ${itemName} has been updated.</p>
    <p>
     Visit the booking page to view the latest status and details:
    </p>
    <a
      class="link-btn"
      href="https://bookings.magnetic-travel.com/bookings"
      target="_blank"
      >My Bookings</a
    >
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
