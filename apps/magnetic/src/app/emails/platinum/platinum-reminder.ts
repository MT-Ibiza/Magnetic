import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from '../partials';

export function platinumReminderTemplate(clientName: string) {
  const year = getCurrentYear();

  const content = `
    <div class="content">
			<h2>Hi, ${clientName}</h2>
			<p>Not long now! We hope you're ready for your holiday.</p>
			<p>
				Your concierge booking platform is now closed, but you can still view
				your existing bookings online.
			</p>
			<p>
				Going forward, all current and additional bookings will now be
				personally managed by your dedicated concierge manager. Simply reach
				out at any time, and we'll take care of everything for you.
			</p>
			<p>We look forward to welcoming you to Ibiza soon!</p>
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
