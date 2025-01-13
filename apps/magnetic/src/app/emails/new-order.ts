import { Order } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';

export function newOrderTemplate(order: Order) {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.item.name}</td>
          <td>${item.quantity}</td>
          <td>${centsToEurosWithCurrency(item.priceInCents)}</td>
          <td>${centsToEurosWithCurrency(
            item.priceInCents * item.quantity
          )}</td>
        </tr>
      `
    )
    .join('');

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orden de Compra</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
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
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333;
    }
    .header p {
      margin: 0;
      color: #555;
    }
    .order-details {
      margin-bottom: 20px;
    }
    .order-details h2 {
      font-size: 18px;
      color: #333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .order-details p {
      margin: 5px 0;
      color: #555;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    table th, table td {
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
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Orden de Compra</h1>
      <p>Gracias por tu compra</p>
    </div>

    <div class="order-details">
      <h2>Detalles de la Orden</h2>
      <p><strong>Orden ID:</strong> #${order.id}</p>
      <p><strong>Fecha:</strong> ${new Date(
        order.createdAt
      ).toLocaleDateString()}</p>
      <p><strong>Cliente:</strong> ${order.user.name}</p>
      <p><strong>Email:</strong> ${order.user.email}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <p class="total">Total: ${centsToEurosWithCurrency(order.totalInCents)}</p>

    <div class="footer">
      <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:soporte@magentictravel.com">soporte@magentictravel.com</a>.</p>
    </div>
  </div>
</body>
</html>
  `;
}
