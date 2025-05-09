import { centsFixed } from '@magnetic/utils';
import { NextResponse } from 'next/server';
const Redsys = require('node-redsys-api').Redsys;

const REDSYS_URL = process.env.PAYMENT_REDSYS_URL;
const SECRET_KEY = process.env.PAYMENT_SECRET_KEY;
const MERCHANT_CODE = process.env.PAYMENT_MERCHANT_CODE;
const TERMINAL = process.env.PAYMENT_TERMINAL;
const CURRENCY = process.env.PAYMENT_CURRENCY;

interface InitPaymentRequest {
  amount: number; // En céntimos (1000 = 10€)
  orderId: string; // ID único del pedido
  urlOk: string; // URL de redirección en caso de éxito
  urlKo: string; // URL de redirección en caso de error
}

export async function POST(request: Request) {
  try {
    const { amount, orderId, urlOk, urlKo }: InitPaymentRequest =
      await request.json();

    // Validaciones de los parámetros
    if (!amount || !orderId || !urlOk || !urlKo) {
      return NextResponse.json(
        { message: 'Faltan parámetros obligatorios' },
        { status: 400 }
      );
    }
    if (!/^[0-9A-Za-z]{1,12}$/.test(orderId)) {
      return NextResponse.json(
        {
          message:
            'El número de pedido (orderId) debe ser alfanumérico y tener máximo 12 caracteres',
        },
        { status: 400 }
      );
    }

    const redsys = new Redsys();

    const merchantParams = {
      DS_MERCHANT_AMOUNT: `${centsFixed(amount)}`, // amount in cents
      DS_MERCHANT_ORDER: `MAGNETIC-${orderId}`,
      DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Compra normal
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_MERCHANTURL: `${process.env.NEXTAUTH_URL}/api/v1/user/payment/notification`,
      DS_MERCHANT_URLOK: urlOk,
      DS_MERCHANT_URLKO: urlKo,
    };
    console.log(merchantParams);
    return NextResponse.json({
      redsysUrl: REDSYS_URL,
      signature: redsys.createMerchantSignature(SECRET_KEY, merchantParams),
      merchantParams: redsys.createMerchantParameters(merchantParams),
    });
  } catch (error: any) {
    console.error('Error al crear el pago:', error);
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
