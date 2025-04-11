import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureWelcomeTemplate,
  stylesEmails,
} from '../partials';

export function newUserPlatinumTemplate({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const year = getCurrentYear();

  const content = `
		<div class="content">
			<h2>Hi, ${name}</h2>
			<p>
				Welcome to Magnetic Travel, your dedicated concierge service provider
				in Ibiza. As part of your stay, you have access to our
				<strong>Platinum Package</strong>, which includes:
			</p>
			<ul>
				<li>Car Rentals</li>
				<li>Transfers & Drivers</li>
				<li>Luxury Boat Charters</li>
				<li>Private Chefs & Assistants</li>
				<li>Food & Drinks Delivery</li>
				<li>Wellness & Spa Services</li>
				<li>Private Security</li>
				<li>Restaurant & Club Reservations</li>
				<li>Childcare Services</li>
			</ul>
			<div style="margin-bottom: 20px">
				<h3>Online Bookings</h3>
				<p>
					Our online booking platform allows you to explore services and make
					reservations at your convenience.
				</p>
				<h4>Important reminder:</h4>
				<p>
					So that we can ensure service availability, online bookings close 7
					days before your arrival - please ensure all requests are submitted
					in advance. After this time, a dedicated concierge manager will
					personally handle your requests.
				</p>
			</div>
			<div class="main-content">
				<p>
					<strong>Your Login Details</strong>
				</p>
				<p>
					Access your personal dashboard using the details below:
				</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Password:</strong> ${password}</p>
				<a
					class="link-btn"
					href="https://bookings.magnetic-travel.com/login"
					target="_blank"
					>Get Started</a
				>
			</div>
			<h3>Enhance Your Stay</h3>
			<p>
				For a higher level of service and organisation, we invite you to
				explore our <strong>Diamond package</strong>.
			</p>
			<p>
				<a
					href="https://bookings.magnetic-travel.com/packages"
					target="_blank"
					>View Packages</a
				>
			</p>
      ${signatureWelcomeTemplate}
		</div>
  `;

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Magnetic Travel</title>
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
