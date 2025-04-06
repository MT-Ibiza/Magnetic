import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from '../partials';

export function goldSecondReminderTemplate(clientName: string) {
  const year = getCurrentYear();

  const content = `
  <div class="content">
    <h2>Hi, ${clientName}</h2>
    <p>
      Your Ibiza holiday is just around the corner! Just a quick reminder that your concierge booking platform will close in 3 days.
    </p>
    <p>
      If you haven't yet confirmed all your bookings, now is the time. Once the system closes, you'll still be able to view your confirmed bookings, but new requests will no longer be possible unless you upgrade your package for extended concierge support.
    </p>
    <a
      class="link-btn"
      href="https://bookings.magnetic-travel.com/dashboard"
      target="_blank"
      >Book Now</a
    >
    <p>
      Let us know if we can assist or if you'd like to explore upgrading your package.
    </p>
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
