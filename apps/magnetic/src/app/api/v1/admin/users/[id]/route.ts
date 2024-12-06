import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadFile } from 'apps/magnetic/src/app/services/upload';
import { EditUser } from '@magnetic/interfaces';

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
        packageId: true,
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
  const data: EditUser = await request.json();
  const { email, name, packageId } = data;

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
    await db.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        email,
        packageId,
      },
    });
    return NextResponse.json({ message: 'ok' }, { status: 201 });
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
