import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadFile } from 'apps/magnetic/src/app/upload';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phone: true,
        countryCodePhone: true,
        countryNamePhone: true,
        image: true,
        typeAccount: true,
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        }
      );
    }
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const phone = data.get('phone') as string;
  const countryCodePhone = data.get('countryCodePhone') as string;
  const countryNamePhone = data.get('countryNamePhone') as string;
  const password = data.get('password') as string | null;
  const newImage = data.get('newImageFile') as File;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const user = await db.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: 'User not found',
      },
      {
        status: 404,
      }
    );
  }

  if (!user.active) {
    return NextResponse.json(
      {
        message: 'Inactive users cant be edited',
      },
      {
        status: 405,
      }
    );
  }

  try {
    let imagesUploaded;
    if (newImage) {
      imagesUploaded = await uploadFile(newImage);
    }
    const newUrl = imagesUploaded?.url;
    await db.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        image: newUrl,
        phone: phone,
        countryCodePhone: countryCodePhone,
        countryNamePhone: countryNamePhone,
        password: password ? hashedPassword : user.password,
      },
    });
    return NextResponse.json('ok');
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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        }
      );
    }
    const name = user.name;
    const email = user.email;

    const pseudonym = `client_${user.id}_${Date.now()}`;
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: false,
        email: `${pseudonym}@example.com`,
        name: `Deleted Client ${user.id}`,
        phone: null,
      },
    });

    return NextResponse.json('ok');
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
