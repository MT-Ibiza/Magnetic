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
      return new Response('No package found', { status: 404 });
    }

    let upgradeItem = await db.item.findFirst({
      where: {
        name: { contains: packageItem.name },
        type: 'upgrade_plan',
      },
    });

    if (upgradeItem) {
      upgradeItem = await db.item.update({
        where: {
          id: upgradeItem.id,
        },
        data: {
          name: packageItem.name,
          priceInCents: packageItem.priceInCents,
        },
      });
    } else {
      upgradeItem = await db.item.create({
        data: {
          name: packageItem.name,
          description: 'plan',
          type: 'upgrade_plan',
          priceInCents: packageItem.priceInCents,
        },
      });
    }

    const order = await db.order.create({
      data: {
        userId: userId,
        status: 'pending',
        totalInCents: upgradeItem.priceInCents,
        subtotal: upgradeItem.priceInCents,
        feeInCents: 0,
        vatInCents: 0,
        items: {
          create: [
            {
              quantity: 1,
              priceInCents: upgradeItem.priceInCents,
              itemId: upgradeItem.id,
              type: 'upgrade_plan',
            },
          ],
        },
      },
    });

    // const updatedUser = await db.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     packageId: packageItem.id,
    //   },
    //   select: {
    //     name: true,
    //     firstName: true,
    //     lastName: true,
    //     email: true,
    //     phone: true,
    //     accommodation: true,
    //     arrivalDate: true,
    //     departureDate: true,
    //     package: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //   },
    // });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
    });
  }
}
