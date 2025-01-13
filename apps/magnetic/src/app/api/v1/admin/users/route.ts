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

export async function POST(request: Request) {
  try {
    const data: NewUser = await request.json();
    const { email, name, password, packageId, phone, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        role: role as 'client',
        packageId,
        phone: phone,
        // countryCodePhone: countryCodePhone,
        // countryNamePhone: countryNamePhone,
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
