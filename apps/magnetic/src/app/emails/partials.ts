export const headerTemplate = `
	<header>
		<img
			src="https://www.magnetic-travel.com/wp-content/uploads/2018/05/rsz_logo_mgtedit.png"
			style="width: 100px"
		/>
	</header>
`;

export const footerTemplate = (year: number) => {
  return `
		<footer>
			<p>&copy; ${year} Magnetic Travel. All rights reserved.</p>
			<a
				href="https://bookings.magnetic-travel.com/terms-conditions"
				style="color: black; text-decoration: none"
				>Terms & Conditions</a
			>
		</footer>
`;
};

export const signatureTemplate = `
	<div style="margin-top: 60px">
		<p>Regards,</p>
		<p><strong>The Magnetic Travel Team</strong></p>
	</div>
`;

export const signatureWelcomeTemplate = `
	<div style="margin-top: 60px">
    <p>
			Thank you for choosing Magnetic Travel. We look forward to welcoming
			you to Ibiza soon!
		</p>
		<p>Regards,</p>
		<p><strong>The Magnetic Travel Team</strong></p>
	</div>
`;

export const stylesEmails = `
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
			header {
				color: #fff;
				padding: 20px;
				text-align: center;
				border-bottom: 2px solid #e7e7e7;
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
			}
			.content li {
				color: #555;
				line-height: 1.6;
				margin: 5px 0;
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
			}
			.content .link-btn:hover {
				background-color: #4338ca;
			}
			.main-content {
				background: #f7f7f7;
				padding: 10px 30px;
			}
			footer {
				background-color: white;
				color: black;
				font-size: 12px;
				padding: 10px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1px solid #ddd;
			}
	</style>
`;
