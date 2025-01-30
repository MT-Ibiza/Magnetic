import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { requestACallTemplate } from 'apps/magnetic/src/app/emails/request-call';
import moment from 'moment';

export async function POST(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, date, time, notes } = body;

    await sendEmail({
      to: email,
      subject: `Magnetic: Request a call`,
      html: requestACallTemplate({
        name,
        date: moment(date).format('DD MMM YYYY'),
        time,
        notes,
        email,
      }),
    });

    return NextResponse.json({
      message: 'Request call successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
