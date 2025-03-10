import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        instructions: true,
        script: true,
        termsAndConditions: true,
        imageUrl: true,
        serviceType: true,
        packages: {
          select: {
            id: true,
            name: true,
          },
        },
        items: {
          where: {
            published: true,
          },
          select: {
            id: true,
            name: true,
            priceInCents: true,
            description: true,
            images: true,
            boatAttributes: true,
            drinkAttributes: true,
            transferAttributes: {
              select: {
                capacity: true,
              },
            },
            position: true,
            variants: {
              select: {
                id: true,
                priceInCents: true,
                name: true,
                capacity: true,
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
            categoryId: true,
            serviceId: true,
            service: {
              select: {
                id: true,
                name: true,
                serviceType: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(service);
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
