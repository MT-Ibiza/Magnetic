import { Order } from '@magnetic/interfaces';
import { centsToEurosWithCurrency, getCurrentYear } from '@magnetic/utils';
import { footerTemplate, headerTemplate, stylesEmailsTable } from './partials';
import moment from 'moment';

export function bookingConfirmationTemplate(order: Order) {
  const year = getCurrentYear();

  const forms = order.forms;
  const items = order.items;

  const tableItems = forms.map((form) => {
    const isDrinks = form.type === 'drinks';
    const orderItems = items.filter((orderItem) =>
      isDrinks
        ? orderItem.type === 'drinks'
        : orderItem.cartItemId === form.cartItemId
    );
    const mainOrderItem = orderItems[0];

    const totalItems = orderItems.reduce((total, item) => {
      const totalOrderItem = item.quantity * item.priceInCents;
      return total + totalOrderItem;
    }, 0);

    return {
      product:
        form.type === 'drinks' ? 'Drinks Service' : mainOrderItem.item.name,
      date: form.date,
      quantity: form.type === 'drinks' ? 1 : mainOrderItem.quantity,
      priceInCents:
        form.type === 'drinks' ? totalItems : mainOrderItem.priceInCents,
      total: totalItems,
    };
  });

  const itemsHtml = tableItems
    .map(
      (item) => `
        <tr>
          <td>${item.product}</td>
          <td>${moment(item.date).format('D/M/YYYY')}</td>
          <td>${item.quantity}</td>
          <td>${centsToEurosWithCurrency(item.priceInCents)}</td>
          <td>${centsToEurosWithCurrency(
            item.priceInCents * item.quantity
          )}</td>
        </tr>
      `
    )
    .join('');

  const vatAmount = order.vatInCents;
  const feeInCents = order.feeInCents;
  const total = order.totalInCents;

  const userName = order.guestUser ? order.guestUser.name : order.user.name;
  const userEmail = order.guestUser ? order.guestUser.email : order.user.email;

  const content = `
		<div class="content">
			<h3>Order Summary</h3>
			<p><strong>Order ID:</strong> #${order.id}</p>
			<p>
				<strong>Date:</strong> ${moment(order.createdAt).format('D/M/YYYY')}
			</p>
			<p><strong>Client:</strong> ${userName}</p>
			<p><strong>Email:</strong> ${userEmail}</p>
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
						<td><strong>Includes VAT (21%)</strong></td>
						<td><strong>${centsToEurosWithCurrency(vatAmount)}</strong></td>
					</tr>
          <tr>
						<td></td>
						<td></td>
						<td></td>
						<td><strong>Service Fee (2%)</strong></td>
						<td><strong>${centsToEurosWithCurrency(feeInCents)}</strong></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td><strong>Total Amount</strong></td>
						<td>
							<strong>${centsToEurosWithCurrency(total)}</strong>
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
