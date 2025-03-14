import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import moment from 'moment';

export async function GET(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const userId = decodedToken.id;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        accommodation: true,
        arrivalDate: true,
        departureDate: true,
        passportNumber: true,
        billingAddress: true,
        passportAttachmentUrl: true,
        companyName: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        message: error.message || 'An error occurred while fetching the user',
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const accommodation = formData.get('accommodation') as string;
    const arrivalDate = formData.get('arrivalDate') as string;
    const departureDate = formData.get('departureDate') as string;
    const passportNumber = formData.get('passportNumber') as string;
    const billingAddress = formData.get('billingAddress') as string;
    const passportFile = formData.get('passportAttachmentUrl') as File;
    const companyName = formData.get('companyName') as string | undefined;

    let passportAttachmentUrl = null;
    if (passportFile) {
      const uploadedFiles = await uploadBulkImages(
        [passportFile],
        'user-documents'
      );
      passportAttachmentUrl = uploadedFiles[0];
    }

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: 'Missing required fields: firstName, lastName, or email' },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        phone,
        accommodation,
        arrivalDate: arrivalDate ? moment(arrivalDate).toDate() : null,
        departureDate: departureDate ? moment(departureDate).toDate() : null,
        passportNumber,
        billingAddress,
        passportAttachmentUrl,
        companyName,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      {
        message:
          error.message || 'An error occurred while updating the user profile',
      },
      {
        status: 500,
      }
    );
  }
}
