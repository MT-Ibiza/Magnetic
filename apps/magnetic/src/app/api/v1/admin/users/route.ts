import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { uploadFile } from 'apps/magnetic/src/app/services/upload';
import db from 'apps/magnetic/src/app/libs/db';
import { getParamsFromUrl, searchUsers } from 'apps/magnetic/src/app/services/users';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const role = data.get('role') as Role;
    const phone = data.get('phone') as string;
    const countryCodePhone = data.get('countryCodePhone') as string;
    const countryNamePhone = data.get('countryNamePhone') as string;
    const password = data.get('password') as string;
    const newImage = data.get('newImageFile') as File;
    let imagesUploaded;
    if (newImage) {
      imagesUploaded = await uploadFile(newImage);
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        image: imagesUploaded?.url,
        role: role,
        createdAt: new Date(),
        phone: phone,
        countryCodePhone: countryCodePhone,
        countryNamePhone: countryNamePhone,
        password: hashedPassword,
      },
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
