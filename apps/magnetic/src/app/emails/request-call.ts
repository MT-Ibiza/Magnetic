export function requestACallTemplate(props: {
  name: string;
  date: string;
  time: string;
  notes: string;
  email: string;
}) {
  const { name, date, time, notes, email } = props;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Call Scheduled Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eeeeee;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            margin-top: 20px;
            line-height: 1.6;
            color: #555555;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #aaaaaa;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #a6002b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Call Scheduled Successfully!</h1>
        </div>
        <div class="content">
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for scheduling a call with our team! Here are the details of your appointment:</p>
            <ul>
                <li><strong>Date:</strong> ${date}</li>
                <li><strong>Time:</strong> ${time}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Notes:</strong> ${notes}</li>
            </ul>
            <p>If you need to reschedule or have any questions, feel free to contact us.</p>
            <a href="mailto:support@magnetic.com" class="button">Contact Support</a>
        </div>
        <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>&copy; 2025 Magnetic Team</p>
        </div>
    </div>
</body>
</html>
  `;
}
