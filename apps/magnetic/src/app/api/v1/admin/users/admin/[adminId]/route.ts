import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import bcrypt from 'bcrypt';

export async function PUT(
  request: Request,
  { params }: { params: { adminId: string } }
) {
  try {
    const formData = await request.formData();

    const userId = Number(params.adminId);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    const extractField = (field: string) =>
      formData.get(field) as string | undefined;

    const fields = {
      firstName: extractField('firstName'),
      lastName: extractField('lastName'),
      phone: extractField('phone'),
      email: extractField('email'),
      password: extractField('password'),
    };

    const updateData: any = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone,
      email: fields.email,
    };

    if (fields.password) {
      updateData.password = await bcrypt.hash(fields.password, 10);
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
