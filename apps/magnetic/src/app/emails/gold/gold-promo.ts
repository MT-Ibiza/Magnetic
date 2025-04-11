import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureTemplate,
  stylesEmails,
} from '../partials';

export function goldPromoTemplate(clientName: string) {
  const year = getCurrentYear();

  const content = `
		<div class="content">
  		<h2>Hi, ${clientName}</h2>
  		<p>
  			Welcome to Ibiza! We hope you had a smooth arrival and are settling in nicely.
  		</p>
  		<p>
  			We know that sometimes plans change, and you may find you need extra
  			services and support. That's why we're delighted to offer an exclusive
  			upgrade to our Platinum Package at a special rate of €800 per week
  			(normally €1,200).
  		</p>
  		<p>With Platinum, you'll enjoy:</p>
  		<ul>
  			<li>Dedicated concierge support throughout your stay</li>
  			<li>Access to last-minute reservations</li>
  			<li>Additional luxury services & VIP experiences</li>
  		</ul>
  		<a
        class="link-btn"
        href="https://api.whatsapp.com/send/?phone=34680419368&text=Hello!%20I%20would%20like%20to%20chat%20with%20you"
        target="_blank"
  			>Upgrade Now</a
  		>
  		<p>
  			Let us know if we can help - we're here to ensure you have the best
  			possible experience in Ibiza!
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
