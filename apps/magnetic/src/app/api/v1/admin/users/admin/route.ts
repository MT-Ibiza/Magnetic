import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const newUser = await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        role: 'admin',
      },
      include: {
        package: {
          select: {
            name: true,
          },
        },
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
