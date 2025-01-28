import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { uploadFile } from 'apps/magnetic/src/app/services/upload';
import db from 'apps/magnetic/src/app/libs/db';
import {
  getParamsFromUrl,
  searchUsers,
} from 'apps/magnetic/src/app/services/users';
import { NewUser } from '@magnetic/interfaces';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { newAccountTemplate } from 'apps/magnetic/src/app/emails/new-account';
import moment from 'moment';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const packageId = formData.get('packageId')
      ? Number(formData.get('packageId'))
      : null;
    const role = (formData.get('role') as string) || 'client';    
    const accommodation = formData.get('accommodation') as string;
    const arrivalDate = formData.get('arrivalDate') as string;
    const departureDate = formData.get('departureDate') as string;
    const passportNumber = formData.get('passportNumber') as string;
    const billingAddress = formData.get('billingAddress') as string;
    const passportFile = formData.get('passportAttachmentUrl') as File;

    let passportAttachmentUrl = null;
    if (passportFile) {
      const uploadedFiles = await uploadBulkImages(
        [passportFile],
        'user-documents'
      );
      passportAttachmentUrl = uploadedFiles[0];
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        role: role as 'client',
        accommodation,
        arrivalDate: arrivalDate ? moment(arrivalDate).toDate() : null,
        departureDate: departureDate ? moment(departureDate).toDate() : null,
        passportNumber,
        passportAttachmentUrl,
        billingAddress,
        packageId,
        phone: phone,
        password: hashedPassword,
      },
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

export async function GET(req: NextRequest) {
  try {
    const { searchText, page, pageSize, active, role } = getParamsFromUrl(
      req.nextUrl.searchParams
    );
    const users = await searchUsers({
      searchText,
      page,
      pageSize,
      active,
      role,
    });

    return NextResponse.json(users);
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
