import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const service = await db.service.findFirst({
      where: {
        serviceType: 'boat_rental',
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
        categories: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
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
            position: true,
            variants: {
              select: {
                id: true,
                priceInCents: true,
                name: true,
                capacity: true,
                hours: true,
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
