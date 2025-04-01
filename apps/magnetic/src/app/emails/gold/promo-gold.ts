export function promoGoldTemplate(clientName: string) {
  return `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Welcome to Ibiza - Special Offer</title>
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
				border: 1px solid #ddd;
				border-radius: 8px;
				overflow: hidden;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
			}
			.content a:hover {
				background-color: #4338ca;
			}
			.footer {
				background-color: #1f2a37;
				padding: 10px;
				text-align: center;
				font-size: 14px;
				color: white;
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
				<h2>Hi, ${clientName}</h2>
				<p>
					Welcome to Ibiza! We hope your arrival was smooth and you're settling
					in nicely.
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
				<a href="https://mymagnetictravel.com/packages" target="_blank"
					>Upgrade Now</a
				>
				<p>
					Let us know if we can help - we're here to ensure you have the best
					possible experience in Ibiza!
				</p>
				<div style="margin-top: 50px">
					<p>Regards,</p>
					<p><strong>The Magnetic Travel Team</strong></p>
				</div>
			</div>
			<div class="footer">
				<p>&copy; 2025 Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>
  `;
}
