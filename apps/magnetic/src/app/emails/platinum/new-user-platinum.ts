import { getCurrentYear } from '@magnetic/utils';

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
  return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Welcome to Magnetic Travel</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f9f9f9;
				margin: 0;
				padding: 0;
			}
			.email-container {
				max-width: 600px;
				margin: 20px auto;
				background: #fff;
				border: 1px solid #ddd;
				border-radius: 8px;
				overflow: hidden;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			}
			.header {
				background-color: #4f46e5;
				color: #fff;
				padding: 20px;
				text-align: center;
			}
			.header h1 {
				margin: 0;
				font-size: 24px;
			}
			.content {
				padding: 20px;
			}
			.content h2 {
				color: #333;
				font-size: 20px;
			}
			.content p {
				color: #555;
				line-height: 1.6;
				margin: 10px 0;
			}
			.content .highlight {
				color: #4f46e5;
				font-weight: bold;
			}
			.content a {
				display: inline-block;
				margin: 10px 0px;
				padding: 10px 20px;
				background-color: #4f46e5;
				color: #fff;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
			}
			.content a:hover {
				background-color: #4338ca;
			}
			.footer {
				background-color: #f4f4f9;
				padding: 10px;
				text-align: center;
				font-size: 14px;
				color: #888;
			}
			.footer a {
				color: #4f46e5;
				text-decoration: none;
			}
			.footer a:hover {
				text-decoration: underline;
			}
		</style>
	</head>
	<body>
		<div class="email-container">
			<div class="header">
				<h1>Welcome to Magnetic Travel!</h1>
			</div>
			<div class="content">
				<h2>Hi, ${name}</h2>
				<p>
					Welcome to Magnetic Travel, your dedicated concierge service provider
					in Ibiza. As part of your stay, you have access to our Platinum
					Package, which includes:
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
				<p>
					<strong>Online Bookings</strong>
				</p>
				<p>
					Our online booking platform allows you to explore services and make
					reservations at your convenience.
				</p>
				<p>
					<strong>Important reminder:</strong> So that we can ensure service
					availability, online bookings close 7 days before your arrival -
					please ensure all requests are submitted in advance. After this time,
					a dedicated concierge manager will personally handle your requests.
				</p>
				<h3>Your Login Details</h3>
				<p>
					Access your personal dashboard and start arranging your trip using the
					details below:
				</p>
				<p><strong>Username:</strong> ${email}</p>
				<p><strong>Password:</strong> ${password}</p>
				<a href="https://bookings.magnetic-travel.com/dashboard" target="_blank"
					>Get Started</a
				>
				<h3>Enhance Your Stay</h3>
				<p>
					For a higher level of service and organisation, we invite you to
					explore our Diamond package.
				</p>
				<a href="https://bookings.magnetic-travel.com/packages" target="_blank"
					>View Packages</a
				>
				<p>
					Thank you for choosing Magnetic Travel. We look forward to welcoming
					you to Ibiza soon!
				</p>
				<p>Regards,</p>
				<p><strong>The Magnetic Travel Team</strong></p>
			</div>
			<div class="footer">
				<p>
					Thank you for choosing Magnetic Travel. We look forward to welcoming
					you to Ibiza soon!
				</p>
				<p>&copy; ${year} Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>
  `;
}
