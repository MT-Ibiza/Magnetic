import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import moment from 'moment';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import bcrypt from 'bcrypt';

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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string | undefined;
    const role = formData.get('role') as string | undefined;
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!user.active) {
      return NextResponse.json(
        { message: 'Inactive users cannot be edited' },
        { status: 405 }
      );
    }

    let updateData: any = {
      firstName,
      lastName,
      phone,
      email,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (user.role === 'client') {
      updateData = {
        ...updateData,
        accommodation: formData.get('accommodation') as string,
        arrivalDate:
          formData.get('arrivalDate') &&
          typeof formData.get('arrivalDate') === 'string'
            ? moment(formData.get('arrivalDate') as string).toDate()
            : null,
        departureDate:
          formData.get('departureDate') &&
          typeof formData.get('departureDate') === 'string'
            ? moment(formData.get('departureDate') as string).toDate()
            : null,
        passportNumber: formData.get('passportNumber') as string,
        billingAddress: formData.get('billingAddress') as string,
        packageId: formData.get('packageId')
          ? Number(formData.get('packageId'))
          : null,
      };

      const passportFile = formData.get('passportAttachmentUrl') as File;
      if (passportFile) {
        const uploadedFiles = await uploadBulkImages(
          [passportFile],
          'user-documents'
        );
        updateData.passportAttachmentUrl = uploadedFiles[0];
      }
    }

    if (role && user.role === 'admin') {
      updateData.role = role;
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
