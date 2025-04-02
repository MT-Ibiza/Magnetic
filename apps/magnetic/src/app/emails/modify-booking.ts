import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from './partials';

export function modifyRequestTemplate({
  message,
  clientName,
}: {
  message: string;
  clientName: string;
}) {
  const year = getCurrentYear();

  const content = `
		<div class="content">
			<h2>Hi, ${clientName}</h2>
			<p>Thank you for your request. We've received the following details:</p>
			<div style="background-color: #f7f7f7; padding: 3px 10px">
				<p>${message}</p>
			</div>
			<p>
				Our team is reviewing it and will get back to you as soon as possible.
				If we need any further details, we'll reach out.
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
