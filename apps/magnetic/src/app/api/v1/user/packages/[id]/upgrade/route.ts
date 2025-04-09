import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../../../util';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = Number(decodedToken.id);
    const packageId = Number(params.id);
    const packageItem = await db.package.findUnique({
      where: { id: packageId },
    });

    if (!packageItem) {
      return new Response('No package found', {
        status: 404,
      });
    }

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        packageId: packageItem.id,
      },
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

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
    });
  }
}
