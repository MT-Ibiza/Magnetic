export function modifyRequestTemplate({
  requestContent,
  clientName,
}: {
  requestContent: string;
  clientName: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Modify Request Received!</title>
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
				<h1>Modify Request Received!</h1>
			</div>
			<div class="content">
				<h2>Hi, ${clientName}</h2>
				<p>Thank you for your request. We've received the following details:</p>
				<p>${requestContent}</p>
				<p>
					Our team is reviewing it and will get back to you as soon as possible.
					If we need any further details, we'll reach out.
				</p>
				<p>Regards,</p>
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
