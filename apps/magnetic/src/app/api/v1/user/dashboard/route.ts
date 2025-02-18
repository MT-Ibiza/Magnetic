import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';

export async function GET(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;
    const packages = await db.package.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        priceInCents: true,
        features: true,
      },
    });
    const services = await db.service.findMany({
      include: {
        packages: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        accommodation: true,
        arrivalDate: true,
        departureDate: true,
        passportNumber: true,
        billingAddress: true,
        passportAttachmentUrl: true,
        package: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ packages, services, user });
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
