import moment from 'moment';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import { newUserGoldTemplate } from 'apps/magnetic/src/app/emails/gold/new-user-gold';
import { newUserPlatinumTemplate } from 'apps/magnetic/src/app/emails/platinum/new-user-platinum';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const extractField = (field: string) =>
      formData.get(field) as string | undefined;

    const fields = {
      firstName: extractField('firstName'),
      lastName: extractField('lastName'),
      phone: extractField('phone'),
      email: extractField('email'),
      password: extractField('password'),
      arrivalDate: extractField('arrivalDate'),
      departureDate: extractField('departureDate'),
      accommodation: extractField('accommodation'),
      passportNumber: extractField('passportNumber'),
      billingAddress: extractField('billingAddress'),
      packageId: extractField('packageId'),
      companyName: extractField('companyName'),
      passportAttachmentUrl: formData.get(
        'passportAttachmentUrl'
      ) as File | null,
    };

    const newUserData: any = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      name: `${fields.firstName} ${fields.lastName}`,
      phone: fields.phone,
      email: fields.email,
      accommodation: fields.accommodation,
      passportNumber: fields.passportNumber,
      billingAddress: fields.billingAddress,
      packageId: fields.packageId ? Number(fields.packageId) : null,
      companyName: fields.companyName,
    };

    if (fields.password) {
      newUserData.password = await bcrypt.hash(fields.password, 10);
    }

    if (fields.arrivalDate) {
      newUserData.arrivalDate = moment(fields.arrivalDate).isValid()
        ? moment(fields.arrivalDate).toDate()
        : null;
    }

    if (fields.departureDate) {
      newUserData.departureDate = moment(fields.departureDate).isValid()
        ? moment(fields.departureDate).toDate()
        : null;
    }

    if (fields.passportAttachmentUrl) {
      const uploadedFiles = await uploadBulkImages(
        [fields.passportAttachmentUrl],
        'user-documents'
      );
      newUserData.passportAttachmentUrl = uploadedFiles[0];
    }

    const newUser = await db.user.create({
      data: newUserData,
      include: {
        package: {
          select: {
            name: true,
          },
        },
      },
    });

    try {
      if (newUser.package?.name === 'gold') {
        await sendEmail({
          to: newUser.email,
          subject: 'Your Ibiza Holiday - Concierge Services Platform',
          html: newUserGoldTemplate({
            name: newUser.name,
            email: newUser.email,
            password: fields.password || '',
          }),
        });
      }
      if (newUser.package?.name === 'platinum') {
        await sendEmail({
          to: newUser.email,
          subject: 'Your Ibiza Holiday - Concierge Services Platform',
          html: newUserPlatinumTemplate({
            name: newUser.name,
            email: newUser.email,
            password: fields.password || '',
          }),
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
