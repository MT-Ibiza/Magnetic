import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import moment from 'moment';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import bcrypt from 'bcrypt';

export async function PUT(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const formData = await request.formData();

    const userId = Number(params.clientId);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'client') {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

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

    const updateData: any = {
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
      updateData.password = await bcrypt.hash(fields.password, 10);
    }

    if (fields.arrivalDate) {
      updateData.arrivalDate = moment(fields.arrivalDate).isValid()
        ? moment(fields.arrivalDate).toDate()
        : null;
    }

    if (fields.departureDate) {
      updateData.departureDate = moment(fields.departureDate).isValid()
        ? moment(fields.departureDate).toDate()
        : null;
    }

    if (fields.passportAttachmentUrl) {
      const uploadedFiles = await uploadBulkImages(
        [fields.passportAttachmentUrl],
        'user-documents'
      );
      updateData.passportAttachmentUrl = uploadedFiles[0];
    }

    await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
