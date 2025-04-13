import { NextResponse } from 'next/server';
import {
  validateSignature,
  getOrderFromDecodedParams,
  isSuccessResponse,
  handleSuccess,
  handleFailure,
} from '../_service';

export async function POST(request: Request) {
  try {
    const { signature, merchantParams, version } = await request.json();

    if (!version || !merchantParams || !signature) {
      return NextResponse.json({ message: 'Missing params' }, { status: 400 });
    }

    const { isValid, decodedParams } = validateSignature(
      version,
      merchantParams,
      signature
    );

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    const { Ds_Response: responseCode } = decodedParams;
    const { order, orderId } = await getOrderFromDecodedParams(decodedParams);

    if (!order)
      return NextResponse.json({ message: 'Orden not found' }, { status: 404 });

    if (isSuccessResponse(responseCode)) {
      await handleSuccess(order);
      return NextResponse.json({ message: 'OK' });
    } else {
      await handleFailure(orderId, responseCode);
      return NextResponse.json(
        { message: 'We can validate your payment, please contact support' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error notification payment', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
