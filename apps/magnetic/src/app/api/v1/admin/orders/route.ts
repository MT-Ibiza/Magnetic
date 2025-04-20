import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Desactiva la optimización estática

export async function GET(request: Request) {
  const orders = await db.order.findMany({
    where: {
      status: {
        not: 'cancelled',
      },
    },
    include: {
      guestUser: true,
      user: {
        select: { id: true, name: true, email: true },
      },
      items: {
        include: {
          item: {
            select: {
              id: true,
              name: true,
              description: true,
              priceInCents: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(orders, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
