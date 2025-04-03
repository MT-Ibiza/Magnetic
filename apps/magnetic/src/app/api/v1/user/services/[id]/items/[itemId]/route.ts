import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const item = await db.item.findUnique({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        priceInCents: true,
        serviceId: true,
        images: {
          select: {
            id: true,
            position: true,
            url: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            formType: true,
            serviceId: true,
            position: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            serviceType: true,
            instructions: true,
            termsAndConditions: true,
          },
        },
        boatAttributes: true,
        transferAttributes: {
          select: {
            capacity: true,
          },
        },
        childcareAttributes: {
          select: {
            hours: true,
          },
        },
        securityAttributes: {
          select: {
            hours: true,
          },
        },
        variants: {
          select: {
            id: true,
            name: true,
            priceInCents: true,
            description: true,
            capacity: true,
            hours: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        seasonPrices: {
          select: {
            id: true,
            startMonth: true,
            endMonth: true,
            priceInCents: true,
          },
        },
      },
    });
    return NextResponse.json(item);
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
