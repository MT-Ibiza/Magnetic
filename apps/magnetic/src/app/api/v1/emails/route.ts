import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { goldFirstReminderTemplate } from '../../../emails/gold/gold-first-reminder';
import { goldLastReminderTemplate } from '../../../emails/gold/gold-last-reminder';
import { goldPromoTemplate } from '../../../emails/gold/gold-promo';
import { goldSecondReminderTemplate } from '../../../emails/gold/gold-second-reminder';
import { platinumReminderTemplate } from '../../../emails/platinum/platinum-reminder';
import { goodByeTemplate } from '../../../emails/good-bye-email';

type EmailType =
  | 'goodbye'
  | 'gold-first-reminder'
  | 'gold-second-reminder'
  | 'gold-last-reminder'
  | 'gold-promo'
  | 'platinum-reminder';

async function sendUserEmails(emailType: EmailType) {
  let users = [];
  const today = new Date();

  switch (emailType) {
    case 'goodbye':
      users = await db.user.findMany({
        where: {
          departureDate: {
            lt: today,
          },
        },
      });
      break;
    case 'gold-first-reminder':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: {
            in: [
              new Date(today.setDate(today.getDate() + 30)),
              new Date(today.setDate(today.getDate() + 10)),
            ],
          },
        },
      });
      break;
    case 'gold-second-reminder':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: {
            in: [
              new Date(today.setDate(today.getDate() + 30)),
              new Date(today.setDate(today.getDate() + 10)),
            ],
          },
        },
      });
      break;
    case 'gold-last-reminder':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: new Date(today.setDate(today.getDate() + 7)),
        },
      });
      break;
    case 'gold-promo':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: new Date(today.setDate(today.getDate() - 1)),
        },
      });
      break;

    case 'platinum-reminder':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: {
            in: [
              new Date(today.setDate(today.getDate() + 30)),
              new Date(today.setDate(today.getDate() + 10)),
            ],
          },
        },
      });
      break;
  }

  for (const user of users) {
    let subject, html;

    switch (emailType) {
      case 'goodbye':
        subject = 'Goodbye! Hope to see you again';
        html = goodByeTemplate(user.firstName);
        break;
      case 'gold-first-reminder':
        subject = 'Plan Ahead for Your Holiday';
        html = goldFirstReminderTemplate(user.firstName);
        break;
      case 'gold-second-reminder':
        subject = 'Last Chance to Book Your Services';
        html = goldSecondReminderTemplate(user.firstName);
        break;
      case 'gold-last-reminder':
        subject = 'Final Details Before Your Arrival';
        html = goldLastReminderTemplate(user.firstName);
        break;
      case 'gold-promo':
        subject = 'Welcome to Ibiza - Special Offer';
        html = goldPromoTemplate(user.firstName);
        break;
      case 'platinum-reminder':
        subject = 'Final Details Before Your Arrival';
        html = platinumReminderTemplate(user.firstName);
        break;
    }

    try {
      await sendEmail({
        to: user.email,
        subject,
        html,
      });
    } catch (error) {
      console.error(
        `Error sending ${emailType} email to ${user.email}:`,
        error
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { type } = await request.json();
    if (
      ![
        'goodbye',
        'gold-first-reminder',
        'gold-second-reminder',
        'gold-last-reminder',
        'gold-promo',
        'platinum-reminder',
      ].includes(type)
    ) {
      return NextResponse.json(
        { message: 'Invalid email type' },
        { status: 400 }
      );
    }

    await sendUserEmails(type as EmailType);
    return NextResponse.json({ message: `${type} emails sent successfully` });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
