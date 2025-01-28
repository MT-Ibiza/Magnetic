import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadFile } from 'apps/magnetic/src/app/services/upload';
import moment from 'moment';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: Number(params.id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        accommodation: true,
        arrivalDate: true,
        departureDate: true,
        passportNumber: true,
        passportAttachmentUrl: true,
        billingAddress: true,
        packageId: true,
        createdAt: true, 
        package: {
          select: {
            id: true,
            name: true,
          },
        }, 
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const accommodation = formData.get('accommodation') as string;
    const arrivalDate = formData.get('arrivalDate') as string;
    const email = formData.get('email') as string;
    const departureDate = formData.get('departureDate') as string;
    const passportNumber = formData.get('passportNumber') as string;
    const billingAddress = formData.get('billingAddress') as string;
    const packageId = formData.get('packageId')
      ? Number(formData.get('packageId'))
      : null;
    const passportFile = formData.get('passportAttachmentUrl') as File;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!user.active) {
      return NextResponse.json(
        { message: 'Inactive users cannot be edited' },
        { status: 405 }
      );
    }

    let passportAttachmentUrl = user.passportAttachmentUrl;
    if (passportFile) {
      const uploadedFiles = await uploadBulkImages(
        [passportFile],
        'user-documents'
      );
      passportAttachmentUrl = uploadedFiles[0]; 
    }

    await db.user.update({
      where: { id: Number(params.id) },
      data: {
        firstName,
        lastName,
        phone,
        email,
        accommodation,
        arrivalDate: arrivalDate ? moment(arrivalDate).toDate() : null,
        departureDate: departureDate ? moment(departureDate).toDate() : null,
        passportNumber,
        billingAddress,
        packageId,
        passportAttachmentUrl,
      },
    });

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await db.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

