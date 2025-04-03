import { Order } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  formatDate,
  getCurrentYear,
  orderItemsByCategory,
} from '@magnetic/utils';
import moment from 'moment';
import { footerTemplate, headerTemplate, stylesEmailsTable } from './partials';

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

  const content = `
		<div class="content">
			<h3>Order Summary</h3>
			<p><strong>Order ID:</strong> #${order.id}</p>
			<p>
				<strong>Date:</strong> ${moment(order.createdAt).format('D/M/YYYY')}
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
  `;

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
		${stylesEmailsTable}
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
