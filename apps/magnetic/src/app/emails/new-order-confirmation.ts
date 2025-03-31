import { Order } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  formatDate,
  getCurrentYear,
  orderItemsByCategory,
} from '@magnetic/utils';

export function bookingConfirmationTemplate(order: Order) {
  const year = getCurrentYear();

  // const itemsByCategory = orderItemsByCategory(order.items);

  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.item.name}</td>
          <td>date</td>
          <td>${item.quantity}</td>
          <td>${centsToEurosWithCurrency(item.priceInCents)}</td>
          <td>${centsToEurosWithCurrency(
            item.priceInCents * item.quantity
          )}</td>
        </tr>
      `
    )
    .join('');

  const vatAmount = order.totalInCents * 0.21;
  const totalWithVAT = order.totalInCents + vatAmount;

  return `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Booking Confirmation</title>
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
			rel="stylesheet"
		/>
		<style>
			body {
				font-family: "Poppins", Arial, sans-serif;
				line-height: 1.6;
				margin: 0;
				padding: 0;
				background-color: #f9f9f9;
			}
			.email-container {
				max-width: 800px;
				margin: 20px auto;
				background: #fff;
				padding: 20px;
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
			.header p {
				margin: 0;
				font-size: 16px;
			}
			.content p {
				color: #555;
				font-size: 16px;
				margin: 0 0 5px 0;
			}
			.content h3 {
				font-size: 18px;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				margin-top: 10px;
			}
			table th,
			table td {
				border: 1px solid #ddd;
				padding: 8px;
				text-align: center;
			}
			table th {
				background: #f7f7f7;
				color: #333;
				font-weight: bold;
			}
			table td {
				color: #555;
			}
			.total {
				text-align: right;
				margin-top: 10px;
				font-size: 18px;
				font-weight: bold;
				color: #333;
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
					style="width: 120px"
				/>
			</div>
			<div class="content">
				<h3>Order Details</h3>
				<p><strong>Order ID:</strong> #${order.id}</p>
				<p>
					<strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}
				</p>
				<p><strong>Client:</strong> ${order.user.name}</p>
				<p><strong>Email:</strong> ${order.user.email}</p>

				<h3>Service Details</h3>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Date</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						${itemsHtml}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td><strong>VAT (21%)</strong></td>
							<td><strong>${centsToEurosWithCurrency(vatAmount)}</strong></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td><strong>Total Amount</strong></td>
							<td>
								<strong>${centsToEurosWithCurrency(totalWithVAT)}</strong>
							</td>
						</tr>
					</tbody>
				</table>
				<div style="margin: 50px 0 20px 0">
					<p>You'll will receive an invoice for your booking shortly.</p>
					<p>Regards,</p>
					<p><strong>The Magnetic Travel Team </strong></p>
				</div>
			</div>
			<div class="footer">
				<p>&copy; ${year} Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>
  `;
}
