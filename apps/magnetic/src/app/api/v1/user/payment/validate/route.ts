import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
const Redsys = require('node-redsys-api').Redsys;

const SECRET_KEY = process.env.PAYMENT_SECRET_KEY;

export async function POST(request: Request) {
  try {
    const { signature, merchantParams, version } = await request.json();

    if (!version || !merchantParams || !signature) {
      return NextResponse.json({ message: 'Missing params' }, { status: 400 });
    }

    const redsys = new Redsys();

    const decodedParams = redsys.decodeMerchantParameters(merchantParams);

    const merchantSignatureNotif = redsys.createMerchantSignatureNotif(
      SECRET_KEY,
      merchantParams
    );

    const isValidSignature = redsys.merchantSignatureIsValid(
      signature,
      merchantSignatureNotif
    );

    if (!isValidSignature) {
      console.error('❌ Invalid signature:', { decodedParams });
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    const { Ds_Order: orderId, Ds_Response: responseCode } = decodedParams;

    const isSuccess =
      parseInt(responseCode, 10) >= 0 && parseInt(responseCode, 10) <= 99;

    const orderIdString = orderId as string;
    const orderIdDB = orderIdString.split('-')[1];

    if (isSuccess) {
      const order = await db.order.findUnique({
        where: {
          id: Number(orderIdDB),
        },
        include: {
          user: true,
          items: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!order || !order.user) {
        return NextResponse.json(
          { message: 'Orden not found' },
          { status: 404 }
        );
      }

      const upgradeItem = order.items.find(
        (orderItem) => orderItem.item.type === 'upgrade_plan'
      );

      if (upgradeItem) {
        const packageUpgrade = await db.package.findFirst({
          where: {
            name: { contains: upgradeItem.item.name },
          },
        });
        if (!packageUpgrade) {
          return NextResponse.json(
            { message: 'Upgrade package not found' },
            { status: 404 }
          );
        }
        await db.user.update({
          where: {
            id: Number(order.user.id),
          },
          data: {
            packageId: packageUpgrade.id,
          },
        });
      } else {
        const userId = order.userId;
        if (userId) {
          //remove cart
          await db.cart.deleteMany({
            where: {
              userId,
            },
          });
        }
      }
      await db.order.update({
        where: {
          id: Number(orderIdDB),
        },
        data: {
          status: 'success',
        },
      });
      return NextResponse.json({ message: 'OK' });
    } else {
      const status = responseCode === '0184' ? 'failed' : 'cancelled';
      await db.order.update({
        where: {
          id: Number(orderIdDB),
        },
        data: {
          status,
        },
      });
      return NextResponse.json(
        {
          message: 'We can validate your payment, please contact support',
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error en la notificación de pago:', error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
