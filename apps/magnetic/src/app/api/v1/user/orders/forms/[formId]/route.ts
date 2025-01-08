import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { formId: string } }
) {
  try {
    const formData: any = await request.json();
    const form = await db.orderBookingForm.update({
      where: {
        id: Number(params.formId),
      },
      data: {
        formData,
      },
    });
    return NextResponse.json(form);
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
