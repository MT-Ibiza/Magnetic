import { getCurrentYear } from '@magnetic/utils';
import {
  footerTemplate,
  headerTemplate,
  signatureWelcomeTemplate,
  stylesEmails,
} from '../partials';

export function newUserGoldTemplate({
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
			Welcome to Magnetic Travel's online booking platform. As part of your
			stay, you have access to complimentary
			<strong>Gold Package</strong> services, which include pre-arrival
			bookings for:
		</p>
		<ul>
			<li>Car Rentals</li>
			<li>Transfers & Drivers</li>
			<li>Boat Charters</li>
			<li>Private Chefs & Assistants</li>
			<li>Food & Drinks Delivery</li>
		</ul>
		<div style="margin-bottom: 1rem">
			<h3>Online Bookings</h3>
			<p>
				Our online booking platform allows you to explore services and make
				reservations at your convenience.
			</p>
			<h4>Important reminder:</h4>
			<p>
				This is a pre-arrival service, available until 7 days before your
				arrival. Please ensure all requests are submitted in advance.
			</p>
		</div>
		<div class="main-content">
			<p>
				<strong>Your Login Details</strong>
			</p>
			<p>
				Access your personal dashboard and start arranging your trip using
				the details below:
			</p>
			<p><strong>Username:</strong> ${email}</p>
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
			For a more personalised experience with access to additional services,
			we invite you to explore our
			<strong>Platinum</strong> and <strong>Diamond</strong> packages.
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
