import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { goldFirstReminderTemplate } from '../../../emails/gold/gold-first-reminder';
import { goldLastReminderTemplate } from '../../../emails/gold/gold-last-reminder';
import { goldPromoTemplate } from '../../../emails/gold/gold-promo';
import { goldSecondReminderTemplate } from '../../../emails/gold/gold-second-reminder';
import { platinumReminderTemplate } from '../../../emails/platinum/platinum-reminder';
import { goodByeTemplate } from '../../../emails/good-bye-email';
import moment from 'moment';

type EmailType =
  | 'goodbye'
  | 'gold-first-reminder'
  | 'gold-second-reminder'
  | 'gold-last-reminder'
  | 'gold-promo'
  | 'platinum-reminder';

const emailTypes: EmailType[] = [
  'goodbye',
  'gold-first-reminder',
  'gold-second-reminder',
  'gold-last-reminder',
  'gold-promo',
  'platinum-reminder',
];

async function sendUserEmails(emailType: EmailType) {
  let users = [];
  const today = moment().toDate();
  const startUTC = moment.utc().startOf('day');
  const nextDayUTC = moment.utc().add(1, 'day').startOf('day');

  switch (emailType) {
    case 'goodbye':
      users = await db.user.findMany({
        where: {
          departureDate: {
            gte: startUTC.toDate(),
            lt: nextDayUTC.toDate(),
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
              moment(today).add(30, 'days').toDate(),
              moment(today).add(10, 'days').toDate(),
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
              moment(today).add(30, 'days').toDate(),
              moment(today).add(10, 'days').toDate(),
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
          arrivalDate: moment(today).add(7, 'days').toDate(),
        },
      });
      break;
    case 'gold-promo':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'gold',
          },
          arrivalDate: moment(today).add(1, 'days').toDate(),
        },
      });
      break;

    case 'platinum-reminder':
      users = await db.user.findMany({
        where: {
          package: {
            name: 'platinum',
          },
          arrivalDate: {
            in: [
              moment(today).add(30, 'days').toDate(),
              moment(today).add(10, 'days').toDate(),
            ],
          },
        },
      });
      break;
  }

  let sentCount = 0;

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
      sentCount++;
    } catch (error) {
      console.error(
        `Error sending ${emailType} email to ${user.email}:`,
        error
      );
    }
  }
  return sentCount;
}

export async function sendAllEmails() {
  let totalSent = 0;

  for (const type of emailTypes) {
    const count = await sendUserEmails(type);
    console.log(`Sent ${count} emails for ${type}`);
    totalSent += count;
  }

  return totalSent;
}

export async function POST(request: Request) {
  try {
    const { type } = await request.json();

    if (type === 'all') {
      const total = await sendAllEmails();
      return NextResponse.json({
        message: `Total emails sent across all types: ${total}`,
      });
    }

    if (!emailTypes.includes(type)) {
      return NextResponse.json(
        { message: 'Invalid email type' },
        { status: 400 }
      );
    }

    const count = await sendUserEmails(type as EmailType);
    return NextResponse.json({
      message: `(${count}) ${type} emails sent successfully`,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
