import { NextResponse } from 'next/server';
import {
  validateSignature,
  getOrderFromDecodedParams,
  isSuccessResponse,
  handleSuccess,
  handleFailure,
} from '../_service';

export async function POST(request: Request) {
  console.log('Notification payment');
  try {
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);

    const version = params.get('Ds_SignatureVersion');
    const merchantParams = params.get('Ds_MerchantParameters');
    const signature = params.get('Ds_Signature');

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
    console.log('responseCode:', responseCode);
    console.log('orderId:', orderId);

    if (!order)
      return NextResponse.json({ message: 'Orden not found' }, { status: 404 });

    if (isSuccessResponse(responseCode)) {
      await handleSuccess(order);
      console.log('order success:', orderId);
    } else {
      await handleFailure(orderId, responseCode);
      console.log('order cancelled:', orderId);
    }
    return NextResponse.json({ message: 'OK' });
  } catch (error: any) {
    console.error('Error notification payment', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
