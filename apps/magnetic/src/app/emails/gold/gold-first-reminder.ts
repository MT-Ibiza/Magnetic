import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from '../partials';

export function goldFirstReminderTemplate(clientName: string) {
  const year = getCurrentYear();

  const content = `
		<div class="content">
			<h2>Hi, ${clientName}</h2>
			<p>
				With only a month left until your holiday, this is a quick reminder
				that booking services in advance is the best way to make the most of
				your stay.
			</p>
			<p>
				Availability for the top services is limited, so if you still need to
				arrange anything, we recommend securing your bookings as soon as
				possible.
			</p>
			<a
        class="link-btn"
        href="https://bookings.magnetic-travel.com/dashboard"
        target="_blank"
				>Book Services</a
			>
			<p>
				If you need any assistance, feel free to request a call with our
				concierge team.
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
