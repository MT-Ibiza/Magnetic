import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: Number(params.orderId),
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(order);
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
