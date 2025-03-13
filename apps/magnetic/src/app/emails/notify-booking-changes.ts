export function bookingStatusTemplate(params: {
  username: string;
  bookingId: number;
  bookingDate: string;
  status: string;
}) {
  const { status, username, bookingId, bookingDate } = params;
  const statusMessage =
    status === 'cancelled'
      ? 'Tu reserva ha sido cancelada con éxito.'
      : 'Tu reserva ha sido actualizada y sigue confirmada.';

  const statusColor = status === 'cancelled' ? '#e53935' : '#4caf50';

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualización de tu reserva</title>
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
        background-color: ${statusColor};
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
      .booking-details {
        background: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0;
      }
      .footer {
        background-color: #f4f4f9;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        color: #888;
      }
      .footer a {
        color: #4caf50;
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
        <h1>Actualización de tu reserva</h1>
      </div>
      <div class="content">
        <h2>Hola, ${username} 👋</h2>
        <p>${statusMessage}</p>
        <div class="booking-details">
          <p><strong>Reserva #${bookingId}</strong></p>
          <p>📅 Fecha: ${bookingDate}</p>
        </div>
        <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
      </div>
      <div class="footer">
        <p>Si necesitas ayuda, visita nuestra <a href="https://magnetictravel.com" target="_blank">página de ayuda</a> o contáctanos en <a href="mailto:soporte@magnetictravel.com">soporte@magnetictravel.com</a>.</p>
        <p>&copy; 2025 Magnetic Travel. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
