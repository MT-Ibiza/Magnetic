import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from './partials';

export function goodByeTemplate(clientName: string) {
  const year = getCurrentYear();
  const content = `
		<div class="content">
			<h2>Hi, ${clientName}</h2>
			<p>We hope you had an amazing time in Ibiza!</p>
			<p>
				Your feedback is important to us - if you have a moment, we'd
				appreciate hearing about your experience.
			</p>
			<p>
				Thank you for choosing Magnetic Travel. We hope to see you back in
				Ibiza again soon!
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
