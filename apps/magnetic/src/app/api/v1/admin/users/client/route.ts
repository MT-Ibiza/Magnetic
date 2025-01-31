import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { newAccountTemplate } from 'apps/magnetic/src/app/emails/new-account';
import moment from 'moment';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';

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

    await sendEmail({
      to: newUser.email,
      subject: `Welcome to Magnetic Travel`,
      html: newAccountTemplate(newUser.name, newUser.package?.name || ''),
    });

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
