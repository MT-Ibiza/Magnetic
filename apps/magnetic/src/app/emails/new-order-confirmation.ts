import { Order } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  formatDate,
  getCurrentYear,
} from '@magnetic/utils';

export function bookingConfirmationTemplate(order: Order) {
  const year = getCurrentYear();

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
		<style>
			body {
				font-family: Arial, sans-serif;
				line-height: 1.6;
				margin: 0;
				padding: 0;
				background-color: #f9f9f9;
			}
			.container {
				max-width: 800px;
				margin: 20px auto;
				background: #fff;
				padding: 20px;
				border: 1px solid #ddd;
				border-radius: 5px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
			.header p {
				margin: 0;
				font-size: 16px;
			}
			.content p {
				color: #555;
				font-size: 16px;
				margin: 0 0 5px 0;
			}
			.content h2 {
				color: #333;
				font-size: 20px;
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
				background: #f4f4f9;
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
		<div class="container">
			<div class="header">
				<h1>Booking Confirmation</h1>
				<p>Thank you for your recent booking!</p>
			</div>

			<div class="content">
				<h3><strong>Booking Details</strong></h3>
				<p><strong>Order ID:</strong> #${order.id}</p>
				<p>
					<strong>Date:</strong> ${formatDate(order.createdAt)}
				</p>
				<p><strong>Client:</strong> ${order.user.name}</p>
				<p><strong>Email:</strong> ${order.user.email}</p>
			</div>

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
				</tbody>
			</table>

			<div class="total">
				<p>VAT (21%): ${centsToEurosWithCurrency(vatAmount)}</p>
				<p>Total Amount: ${centsToEurosWithCurrency(totalWithVAT)}</p>
			</div>

			<div>
				<p>You'll will receive an invoice for your booking shortly.</p>
				<p>Regards,</p>
				<p><strong>The Magnetic Travel Team </strong></p>
			</div>

			<div class="footer">
				<p>&copy; ${year} Magnetic Travel. All rights reserved.</p>
			</div>
		</div>
	</body>
</html>
  `;
}
