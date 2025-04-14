import { DecodedRedsysParams, Order } from '@magnetic/interfaces';
import { bookingConfirmationTemplate } from 'apps/magnetic/src/app/emails/new-order-confirmation';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { cookies } from 'next/headers';
import db from 'apps/magnetic/src/app/libs/db';

const Redsys = require('node-redsys-api').Redsys;
const SECRET_KEY = process.env.PAYMENT_SECRET_KEY;

export async function sendEmailOrder(order: Order) {
  try {
    if (order.user) {
      await sendEmail({
        to: order.user.email,
        subject: `Booking Confirmation #${order.id} - Magnetic Travel`,
        html: bookingConfirmationTemplate(order as any),
      });
      console.log('Client email sent to: ', order.user.email);
    }
    if (order.guestUser) {
      await sendEmail({
        to: order.guestUser.email,
        subject: `Booking Confirmation #${order.id} - Magnetic Travel`,
        html: bookingConfirmationTemplate(order as any),
      });
      console.log('Guest email sent to: ', order.guestUser.email);
    }
  } catch (emailError) {
    console.error('Error sending email:', emailError);
  }
}

export function validateSignature(
  version: string,
  merchantParams: string,
  signature: string
): { isValid: boolean; decodedParams: DecodedRedsysParams } {
  const redsys = new Redsys();
  const decodedParams: DecodedRedsysParams =
    redsys.decodeMerchantParameters(merchantParams);
  const expectedSignature = redsys.createMerchantSignatureNotif(
    SECRET_KEY,
    merchantParams
  );
  const isValid = redsys.merchantSignatureIsValid(signature, expectedSignature);
  return { isValid, decodedParams };
}

export async function getOrderFromDecodedParams(decodedParams: any) {
  const orderIdWithPrefix = decodedParams.Ds_Order as string;
  const orderId = orderIdWithPrefix.split('-')[1];

  const order = await db.order.findUnique({
    where: {
      id: Number(orderId),
    },
    include: {
      user: true,
      guestUser: true,
      forms: {
        orderBy: {
          date: 'asc',
        },
      },
      items: {
        include: {
          item: true,
        },
      },
    },
  });

  return { order, orderId: Number(orderId) };
}

export function isSuccessResponse(responseCode: string) {
  const code = parseInt(responseCode, 10);
  return code >= 0 && code <= 99;
}

export async function handleSuccess(order: any) {
  if (order.status === 'success') return;

  const upgradeItem = order.items.find(
    (orderItem: any) => orderItem.item.type === 'upgrade_plan'
  );

  const isUpgradePlanOrder = !!upgradeItem;

  if (order.user) {
    if (isUpgradePlanOrder) {
      const packageUpgrade = await db.package.findFirst({
        where: {
          name: { contains: upgradeItem.item.name },
        },
      });
      if (packageUpgrade) {
        await db.user.update({
          where: { id: Number(order.user.id) },
          data: { packageId: packageUpgrade.id },
        });
      }
    } else {
      await db.cart.deleteMany({ where: { userId: order.userId } });
    }
  }

  if (order.guestUser) {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cartId')?.value;
    if (cartId) {
      await db.cart.deleteMany({ where: { id: Number(cartId) } });
      cookieStore.delete('cartId');
    }
  }

  await db.order.update({
    where: { id: order.id },
    data: { status: 'success' },
  });

  if (!isUpgradePlanOrder) {
    await sendEmailOrder(order);
  }
}

export async function handleFailure(orderId: number, responseCode: string) {
  const status = responseCode === '0184' ? 'failed' : 'cancelled';
  await db.order.update({
    where: { id: orderId },
    data: {
      status,
      forms: {
        deleteMany: {},
      },
    },
  });
}
