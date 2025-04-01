export function goodByeTemplate(clientName: string) {
  return `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Thank You for Visiting Ibiza!</title>
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
				<p>We hope you had an amazing time in Ibiza!</p>
				<p>
					Your feedback is important to us - if you have a moment, we'd
					appreciate hearing about your experience.
				</p>
				<p>
					Thank you for choosing Magnetic Travel. We hope to see you back in
					Ibiza again soon!
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
