export function goldLastReminderTemplate(username: string) {
  return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Final Details Before Your Arrival</title>
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
			.content a {
				display: inline-block;
				margin-top: 20px;
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
		</style>
	</head>
	<body>
		<div class="email-container">
			<div class="header">
				<h1>Final Details Before Your Arrival</h1>
			</div>
			<div class="content">
				<h2>Hi, ${username}</h2>
				<p>Not long now! We hope you're ready for your holiday.</p>
				<p>
					Your concierge booking platform is now closed, but you can still view
					your existing bookings online.
				</p>
				<p>
					We hope you have a fantastic stay and look forward to welcoming you to
					Ibiza soon!
				</p>
				<p>
					If you’d like to arrange any additional services during your stay, you
					can still upgrade your package for:
				</p>
				<ul>
					<li>Last-minute bookings</li>
					<li>Access to premium services</li>
					<li>Dedicated concierge support</li>
				</ul>
				<a href="https://mymagnetictravel.com/concierge-call" target="_blank"
					>Book a Call</a
				>
				<p>Safe travels,</p>
				<p><strong>The Magnetic Travel Team</strong></p>
			</div>
			<div class="footer">
				<p>&copy; 2025 Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>

  `;
}
