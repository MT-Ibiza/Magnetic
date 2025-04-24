import { NextResponse } from 'next/server';
import {
  handleSuccess,
  handleFailure,
} from '../_service';
import db from 'apps/magnetic/src/app/libs/db';

export async function POST(request: Request) {
  try {
    const { status, orderId } = await request.json();
    const orderIdNumber = Number(orderId);
    const order = await db.order.findUnique({
      where: {
        id: orderIdNumber,
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
    if (order?.status !== 'pending') {
      if (order?.status === 'completed') {
        return NextResponse.json(
          { message: 'Payment completed' },
          { status: 400 }
        );
      }
      if (order?.status === 'failed') {
        return NextResponse.json(
          { message: 'Payment failed' },
          { status: 400 }
        );
      }
    }
    if (status === 'ok') {
      await handleSuccess(order);
      return NextResponse.json({ message: 'OK' });
    }
    if (status === 'fail') {
      await db.order.update({
        where: {
          id: orderIdNumber,
        },
        data: {
          status: 'failed',
        },
      });
      await handleFailure(orderIdNumber, '0184');
      return NextResponse.json(
        { message: 'We can validate your payment, please contact support' },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: 'OK' });
  } catch (error: any) {
    console.error('Error notification payment', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     const { signature, merchantParams, version } = await request.json();

//     if (!version || !merchantParams || !signature) {
//       return NextResponse.json({ message: 'Missing params' }, { status: 400 });
//     }

//     const { isValid, decodedParams } = validateSignature(
//       version,
//       merchantParams,
//       signature
//     );

//     if (!isValid) {
//       return NextResponse.json(
//         { message: 'Invalid signature' },
//         { status: 400 }
//       );
//     }

//     const { Ds_Response: responseCode } = decodedParams;
//     const { order, orderId } = await getOrderFromDecodedParams(decodedParams);

//     if (!order)
//       return NextResponse.json({ message: 'Orden not found' }, { status: 404 });

//     if (isSuccessResponse(responseCode)) {
//       await handleSuccess(order);
//       return NextResponse.json({ message: 'OK' });
//     } else {
//       await handleFailure(orderId, responseCode);
//       return NextResponse.json(
//         { message: 'We can validate your payment, please contact support' },
//         { status: 400 }
//       );
//     }
//   } catch (error: any) {
//     console.error('Error notification payment', error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
