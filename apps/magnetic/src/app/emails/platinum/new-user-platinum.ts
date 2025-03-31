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
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
			rel="stylesheet"
		/>
		<style>
			body {
				font-family: "Poppins", Arial, sans-serif;
				background-color: #f9f9f9;
				margin: 0;
				padding: 0;
			}
			.email-container {
				max-width: 600px;
				margin: 20px auto;
				background: #fff;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
				border-radius: 8px;
				overflow: hidden;
			}
			.header {
				color: #fff;
				padding: 20px;
				text-align: center;
				border-bottom: 2px solid #e7e7e7;
			}
			.header h1 {
				margin: 0;
				font-size: 24px;
			}
			.content {
				padding: 20px;
			}
			.content h3 {
				font-size: 18px;
			}
			.content p {
				color: #555;
				line-height: 1.6;
				margin: 10px 0;
				font-size: 16px;
			}
			.content li {
				color: #555;
				line-height: 1.6;
				margin: 5px 0;
				font-size: 16px;
			}
			.content .highlight {
				color: #4f46e5;
				font-weight: bold;
			}
			.content .link-btn {
				display: inline-block;
				margin: 10px 0px;
				padding: 10px 20px;
				background-color: #4f46e5;
				color: #fff;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
			}
			.content .link-btn:hover {
				background-color: #4338ca;
			}
			.main-content {
				background: #f7f7f7;
				padding: 10px 30px;
			}
			.footer {
				background-color: #1f2a37;
				padding: 10px;
				text-align: center;
				font-size: 14px;
				color: white;
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
				<img
					src="https://www.magnetic-travel.com/wp-content/uploads/2018/05/rsz_logo_mgtedit.png"
					style="width: 100px"
				/>
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
				<h3>Online Bookings</h3>
				<p>
					Our online booking platform allows you to explore services and make
					reservations at your convenience.
				</p>
				<h3>Important reminder:</h3>
				<p>
					So that we can ensure service availability, online bookings close 7
					days before your arrival - please ensure all requests are submitted in
					advance. After this time, a dedicated concierge manager will
					personally handle your requests.
				</p>
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
					For a higher level of service and organisation, we invite you to
					explore our Diamond package.
				</p>
				<p>
					<a
						href="https://bookings.magnetic-travel.com/packages"
						target="_blank"
						>View Packages</a
					>
				</p>
				<p style="margin-top: 50px">
					Thank you for choosing Magnetic Travel. We look forward to welcoming
					you to Ibiza soon!
				</p>
				<p>Regards,</p>
				<p><strong>The Magnetic Travel Team</strong></p>
			</div>
			<div class="footer">
				<p>&copy; ${year} Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>
  `;
}
