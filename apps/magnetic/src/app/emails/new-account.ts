import { User } from '@magnetic/interfaces';

export function newAccountTemplate(username: string, plan: string) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a Magnetic Travel</title>
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
      background-color: #4caf50;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .header p {
      margin: 5px 0;
      font-size: 16px;
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
    .content .plan-highlight {
      color: #4caf50;
      font-weight: bold;
    }
    .content a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4caf50;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .content a:hover {
      background-color: #45a049;
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
      <h1>¡Bienvenido a Magnetic Travel!</h1>
      <p>Tu aventura comienza aquí</p>
    </div>
    <div class="content">
      <h2>Hola, ${username} 👋</h2>
      <p>Estamos emocionados de darte la bienvenida a <strong>Magnetic Travel</strong>. Gracias por unirte a nuestra comunidad.</p>
      <p>Has seleccionado el plan <span class="plan-highlight">${plan}</span>, que te brinda acceso a:</p>
      <ul>
        <li>Itinerarios personalizados y exclusivos</li>
        <li>Acceso VIP a eventos y actividades</li>
        <li>Soporte premium 24/7</li>
        <li>Ofertas y promociones exclusivas</li>
      </ul>
      <p>Estamos seguros de que tu experiencia con nosotros será inolvidable. Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos.</p>
      <a href="https://mymagnetictravel.com/dashboard" target="_blank">Ir a tu Dashboard</a>
    </div>
    <div class="footer">
      <p>Si tienes preguntas, visita nuestra <a href="https://mymagnetictravel.com/help" target="_blank">página de ayuda</a> o contáctanos en <a href="mailto:soporte@mymagnetictravel.com">soporte@mymagnetictravel.com</a>.</p>
      <p>&copy; 2025 Magnetic Travel. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>

  `;
}
